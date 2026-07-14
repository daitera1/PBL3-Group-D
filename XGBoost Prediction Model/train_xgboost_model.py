"""
NaviCare - XGBoost Waiting Time Prediction Model
=================================================

WHAT THIS SCRIPT DOES
----------------------
This script trains a machine learning model that predicts how long a patient
will have to wait at a Hong Kong A&E (Accident & Emergency) department in the
near future, based on:
    - the hospital's current waiting time
    - recent waiting-time history (lag features / rolling averages)
    - time-of-day / day-of-week patterns
    - which hospital it is (one-hot encoded)

WHAT IS XGBOOST?
----------------
XGBoost ("Extreme Gradient Boosting") is a machine learning algorithm that
builds many small decision trees one after another. Each new tree tries to
correct the mistakes of the trees before it. By combining hundreds of these
small trees, XGBoost can learn complex, non-linear patterns in numeric data
- which is exactly the kind of data we have here (waiting times, lags,
rolling averages, hour of day, etc). It is fast, accurate, and one of the
most widely used algorithms for this type of tabular/numeric prediction
problem.

WHY MULTIPLE MODELS FOR CONFIDENCE?
------------------------------------
A single XGBoost model only gives you ONE number (the predicted waiting
time). It does not tell you how sure it is about that number.

To estimate uncertainty, we train several XGBoost models, each on a
slightly different bootstrap sample of the training data (random sampling
with replacement) and with a different random seed. Because each model sees
slightly different data, they will not all agree perfectly:
    - If all models predict a similar value       -> the prediction is STABLE
      -> high confidence.
    - If the models disagree a lot                -> the prediction is
      UNSTABLE -> low confidence.

This is a simple, well-known ensemble technique for approximating prediction
uncertainty from tree-based models (similar in spirit to a "bagging"
ensemble, e.g. Random Forests, but using several independent XGBoost
models).

WHAT DOES THE CONFIDENCE SCORE MEAN?
-------------------------------------
The confidence score (0-95) is NOT the probability that the prediction is
"correct". It combines TWO sources of uncertainty:

    1. ENSEMBLE UNCERTAINTY - how much the models in the ensemble disagree
       with each other (standard deviation of their predictions).
    2. VALIDATION ERROR - how wrong the model has historically been on
       held-out test data (its MAE). Even when all ensemble models agree
       perfectly, the prediction can still be off by roughly this amount.

These are combined into a single "total uncertainty":

    total_uncertainty = sqrt(ensemble_uncertainty^2 + validation_mae^2)

A higher confidence score means the prediction is more STABLE (models agree)
and has LOWER estimated total uncertainty - not that it is guaranteed to be
accurate. Confidence is capped at 95% because hospital waiting times are
inherently unpredictable and should never look perfectly certain.

HOW THIS CONNECTS TO THE NAVICARE APP
---------------------------------------
In the NaviCare app, a user will pick between several hospitals. For each
hospital we can call predict_wait_time_with_confidence() to get:
    - a predicted waiting time in minutes
    - a confidence score showing how stable/trustworthy that estimate is
    - an uncertainty range in minutes (+/-)

The app can then show something like:
    "Queen Mary Hospital: ~65 minutes (confidence: 82%)"
so users can factor in both the expected wait AND how reliable that
estimate is, alongside urgency category and (eventually) distance.
"""

import pandas as pd
import numpy as np
import joblib
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# ---------------------------------------------------------------------------
# CONFIGURATION
# ---------------------------------------------------------------------------
import os

# All paths are relative to this script's folder, so the project can be moved
# around (e.g. into PBL3-Group-D) without breaking anything.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.join(BASE_DIR, "xgboost_ready_dataset_clean.csv")
TARGET_COLUMN = "target"

# Columns that describe WHEN a row happened. We use these only to sort the
# data chronologically before splitting - they are then dropped from the
# model's input features (the model instead learns from hour/dayofweek/
# is_weekend etc, which already capture time-of-day patterns).
TIME_COLUMNS = ["year", "month", "day", "hour", "minute"]

N_MODELS = 10          # how many XGBoost models to train for the ensemble
TRAIN_FRACTION = 0.8   # first 80% of time = training, last 20% = testing

MODEL_DIR = os.path.join(BASE_DIR, "models")
FEATURE_IMPORTANCE_PATH = os.path.join(BASE_DIR, "feature_importance.csv")
PREDICTIONS_PATH = os.path.join(BASE_DIR, "xgboost_predictions_with_confidence.csv")

os.makedirs(MODEL_DIR, exist_ok=True)


# ---------------------------------------------------------------------------
# STEP 1: LOAD THE DATA
# ---------------------------------------------------------------------------
print("Loading dataset...")
df = pd.read_csv(DATA_PATH)
print(f"Loaded {len(df):,} rows and {df.shape[1]} columns.")

# ---------------------------------------------------------------------------
# STEP 2: SORT CHRONOLOGICALLY, THEN TIME-SERIES SPLIT (NO SHUFFLING)
# ---------------------------------------------------------------------------
# The raw CSV rows are grouped by hospital, so they are NOT in pure
# chronological order across the whole file. For a time-series split to make
# sense (train on the past, test on the future) we first have to sort every
# row by its actual timestamp.
print("Sorting rows chronologically...")
df["_datetime"] = pd.to_datetime(df[TIME_COLUMNS])
df = df.sort_values("_datetime").reset_index(drop=True)

split_index = int(len(df) * TRAIN_FRACTION)

train_df = df.iloc[:split_index].copy()
test_df = df.iloc[split_index:].copy()

print(f"Train rows: {len(train_df):,} (oldest -> {train_df['_datetime'].max()})")
print(f"Test rows:  {len(test_df):,} ({test_df['_datetime'].min()} -> newest)")

# Drop the helper timestamp/raw time columns - they were only needed for
# sorting. The model uses year/month/day/hour/minute/dayofweek/is_weekend as
# numeric features instead, which is already in the dataset.
drop_cols = ["_datetime", TARGET_COLUMN]

feature_columns = [c for c in df.columns if c not in drop_cols]

X_train = train_df[feature_columns]
y_train = train_df[TARGET_COLUMN]
X_test = test_df[feature_columns]
y_test = test_df[TARGET_COLUMN]


# ---------------------------------------------------------------------------
# STEP 3: TRAIN AN ENSEMBLE OF XGBOOST MODELS
# ---------------------------------------------------------------------------
# Instead of training just one model, we train N_MODELS independent XGBoost
# models. Each one is trained on a bootstrap sample (random rows drawn WITH
# replacement from the training set) and uses a different random seed. This
# gives every model a slightly different "view" of the training data, so
# their predictions will naturally vary a little - and that variation is
# exactly what we use to measure confidence later.
print(f"\nTraining an ensemble of {N_MODELS} XGBoost models...")

models = []
n_train = len(X_train)

for i in range(N_MODELS):
    rng = np.random.RandomState(i)

    # Bootstrap sample: randomly pick n_train row indices, with replacement.
    bootstrap_idx = rng.randint(0, n_train, size=n_train)
    X_boot = X_train.iloc[bootstrap_idx]
    y_boot = y_train.iloc[bootstrap_idx]

    model = XGBRegressor(
        n_estimators=300,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=i,
        n_jobs=-1,
    )
    model.fit(X_boot, y_boot)
    models.append(model)

    print(f"  Model {i + 1}/{N_MODELS} trained.")

# Save every model in the ensemble so the NaviCare app can load them later
# without needing to retrain.
for i, model in enumerate(models):
    joblib.dump(model, os.path.join(MODEL_DIR, f"xgb_model_{i}.joblib"))

# Also save the exact list/order of feature columns the models expect, so
# the app can build input rows correctly at prediction time.
joblib.dump(feature_columns, os.path.join(MODEL_DIR, "feature_columns.joblib"))

print(f"\nSaved {N_MODELS} models to: {MODEL_DIR}")


# ---------------------------------------------------------------------------
# STEP 4: ENSEMBLE PREDICTION + CONFIDENCE SCORE
# ---------------------------------------------------------------------------
def predict_with_ensemble(X, ensemble):
    """
    Run every model in the ensemble on the given input rows (X) and return
    ALL raw predictions as an array of shape (n_models, n_rows).

    We return the raw per-model predictions (instead of just mean/std) so
    that calculate_confidence() can derive both the final prediction and
    the ensemble uncertainty from the same array.
    """
    return np.stack([model.predict(X) for model in ensemble], axis=0)


def calculate_confidence(predictions, validation_mae, max_confidence=95):
    """
    Turn an ensemble of predictions into a final prediction + confidence.

    Parameters
    ----------
    predictions : list or array of predictions from multiple XGBoost models.
        Either shape (n_models,) for a single input, or (n_models, n_rows)
        for many inputs at once.
    validation_mae : float
        MAE from the held-out test set - the model's typical real-world
        error in minutes.
    max_confidence : float
        Maximum allowed confidence score (default 95). Hospital waiting
        times are unpredictable, so the score should never look perfectly
        certain.

    Returns
    -------
    dict with keys:
        "predicted_wait_time_minutes"   : mean prediction across models
        "confidence_score"              : 0 to max_confidence
        "uncertainty_minutes"           : TOTAL uncertainty (shown to users)
        "ensemble_uncertainty_minutes"  : model-disagreement part only
                                          (kept for debugging)

    IMPORTANT - what the confidence score means
    --------------------------------------------
    The confidence score does NOT mean the prediction is guaranteed correct.
    It represents both model agreement (ensemble uncertainty) and the
    model's past validation error (MAE). A higher confidence means the
    prediction is more stable and has lower estimated total uncertainty.

    The old approach only used the ensemble standard deviation, which was
    misleading: even when all models agree with each other (std ~ 0.8 min),
    the prediction can still be wrong by ~6 minutes on average, because
    that is the model's measured validation error. Combining both terms
    fixes the inflated ~98% confidence scores.
    """
    predictions = np.asarray(predictions, dtype=float)

    # Final prediction = average across the ensemble.
    predicted_wait_time = predictions.mean(axis=0)

    # 1) Ensemble uncertainty: how much the models disagree with each other.
    ensemble_uncertainty = predictions.std(axis=0)

    # 2) Total uncertainty: combine model disagreement with the model's
    #    historical validation error (MAE). The two sources are combined
    #    in quadrature (sqrt of sum of squares), treating them as
    #    independent error sources.
    total_uncertainty = np.sqrt(ensemble_uncertainty ** 2 + validation_mae ** 2)

    # Confidence = how small the total uncertainty is relative to the
    # predicted waiting time. The denominator is floored at 30 minutes so
    # that very short predicted waits do not produce weird/negative
    # confidence values.
    denominator = np.maximum(np.abs(predicted_wait_time), 30)
    confidence = 100 * (1 - total_uncertainty / denominator)
    confidence = np.clip(confidence, 0, max_confidence)

    return {
        "predicted_wait_time_minutes": predicted_wait_time,
        "confidence_score": confidence,
        "uncertainty_minutes": total_uncertainty,
        "ensemble_uncertainty_minutes": ensemble_uncertainty,
    }


# ---------------------------------------------------------------------------
# STEP 5: EVALUATE ON THE TEST SET
# ---------------------------------------------------------------------------
# We first measure the ensemble's real error on the held-out test set (MAE),
# and THEN use that MAE as an input to the confidence calculation - so the
# confidence score reflects how wrong the model actually tends to be, not
# just how much the models agree with each other.
print("\nEvaluating ensemble on the held-out test set...")
test_all_predictions = predict_with_ensemble(X_test, models)
test_mean_pred = test_all_predictions.mean(axis=0)

validation_mae = mean_absolute_error(y_test, test_mean_pred)
rmse = np.sqrt(mean_squared_error(y_test, test_mean_pred))
r2 = r2_score(y_test, test_mean_pred)

print(f"MAE:  {validation_mae:.2f} minutes")
print(f"RMSE: {rmse:.2f} minutes")
print(f"R2:   {r2:.4f}")

# Save the validation MAE next to the models so the NaviCare app can load it
# at prediction time without re-running this evaluation.
joblib.dump(float(validation_mae), os.path.join(MODEL_DIR, "validation_mae.joblib"))

# Now compute confidence for every test row using BOTH uncertainty sources.
test_result = calculate_confidence(test_all_predictions, validation_mae)
test_confidence = test_result["confidence_score"]
test_total_uncertainty = test_result["uncertainty_minutes"]
test_ensemble_uncertainty = test_result["ensemble_uncertainty_minutes"]


# ---------------------------------------------------------------------------
# STEP 6: SAVE TEST-SET PREDICTIONS WITH CONFIDENCE
# ---------------------------------------------------------------------------
predictions_df = test_df.copy()
predictions_df["predicted_wait_time_minutes"] = test_mean_pred
# "uncertainty_minutes" is the TOTAL uncertainty (ensemble + validation MAE)
# - this is what should be shown to users. The ensemble-only part is kept in
# a separate column for debugging.
predictions_df["uncertainty_minutes"] = test_total_uncertainty
predictions_df["ensemble_uncertainty_minutes"] = test_ensemble_uncertainty
predictions_df["confidence_score"] = test_confidence
predictions_df["actual_wait_time_minutes"] = y_test.values

predictions_df.to_csv(PREDICTIONS_PATH, index=False)
print(f"\nSaved test-set predictions to: {PREDICTIONS_PATH}")


# ---------------------------------------------------------------------------
# STEP 7: FEATURE IMPORTANCE TABLE
# ---------------------------------------------------------------------------
# We average feature importance across all models in the ensemble, so the
# table reflects the whole ensemble rather than a single lucky/unlucky model.
importance_matrix = np.stack([model.feature_importances_ for model in models], axis=0)
mean_importance = importance_matrix.mean(axis=0)

feature_importance_df = pd.DataFrame({
    "feature": feature_columns,
    "importance": mean_importance,
}).sort_values("importance", ascending=False).reset_index(drop=True)

feature_importance_df.to_csv(FEATURE_IMPORTANCE_PATH, index=False)
print(f"Saved feature importance table to: {FEATURE_IMPORTANCE_PATH}")


# ---------------------------------------------------------------------------
# STEP 8: FUNCTION FOR THE NAVICARE APP
# ---------------------------------------------------------------------------
def predict_wait_time_with_confidence(input_features, models, validation_mae):
    """
    Predict waiting time (in minutes) with a confidence score, for ONE row
    of input features.

    Parameters
    ----------
    input_features : dict or pandas.Series or pandas.DataFrame (single row)
        Must contain the same feature columns the models were trained on
        (see models/feature_columns.joblib for the exact list/order).
    models : list of trained XGBRegressor models (the ensemble).
    validation_mae : float
        The ensemble's MAE on the held-out test set
        (see models/validation_mae.joblib).

    Returns
    -------
    dict with keys:
        "predicted_wait_time_minutes"  : float
        "confidence_score"             : float (0 to 95)
        "uncertainty_minutes"          : float (total uncertainty - show
                                         this one to users)
        "ensemble_uncertainty_minutes" : float (model disagreement only,
                                         kept for debugging)

    NOTE: The confidence score does not mean the prediction is guaranteed
    correct. It represents both model agreement and the model's past
    validation error. Higher confidence means the prediction is more stable
    and has lower estimated uncertainty.
    """
    # Accept a dict, a Series, or a single-row DataFrame.
    if isinstance(input_features, dict):
        row_df = pd.DataFrame([input_features])
    elif isinstance(input_features, pd.Series):
        row_df = input_features.to_frame().T
    else:
        row_df = input_features.copy()

    # Make sure the columns are in the exact order the models expect.
    row_df = row_df[feature_columns]

    # 1) Get predictions from all XGBoost models in the ensemble.
    all_predictions = predict_with_ensemble(row_df, models)  # shape (n_models, 1)

    # 2) Combine them into a prediction + confidence that accounts for both
    #    ensemble disagreement and past validation error.
    result = calculate_confidence(all_predictions[:, 0], validation_mae)

    # 3) Return plain floats (calculate_confidence returns numpy scalars).
    return {key: float(value) for key, value in result.items()}


# ---------------------------------------------------------------------------
# STEP 9: EXAMPLE PREDICTION
# ---------------------------------------------------------------------------
print("\nExample prediction (first row of the test set):")
example_input = X_test.iloc[[0]]
result = predict_wait_time_with_confidence(example_input, models, validation_mae)

print(f"Predicted waiting time: {result['predicted_wait_time_minutes']:.1f} minutes")
print(f"Confidence score: {result['confidence_score']:.1f}%")
print(f"Possible variation: ±{result['uncertainty_minutes']:.1f} minutes")
