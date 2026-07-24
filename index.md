---
layout: default
title: "CarePath Navigator"
date: 2026-07-24
---

<section class="hero">
  <p class="eyebrow">Ritsumeikan University · PBL3 Group D</p>
  <h2>Making hospital choices clearer before patients arrive.</h2>
  <p class="hero-copy">CarePath Navigator is a smart-healthcare prototype that combines predicted waiting times, hospital information, and location-based comparison to help users consider the fastest and closest care options.</p>
  <div class="hero-actions">
    <a class="button primary" href="https://route-to-care-ai.lovable.app" target="_blank" rel="noopener">Open Live Prototype</a>
    <a class="button secondary" href="{{ '/posts/results/' | relative_url }}">View Results</a>
  </div>
</section>

## Final Project Scope

The final implementation and model evaluation use **Hong Kong public-hospital data**. During the early research stage, the team also investigated NHS and UK data sources because their reporting systems offered a useful reference for a future ideal integration. Those early references remain in parts of the proposal and diagrams as design history; they are not the source of the final reported model results.

<div class="notice">
  <strong>Prototype status:</strong> This is an academic decision-support prototype. It does not diagnose conditions, replace medical professionals, or provide emergency guidance.
</div>

## Problem

Patients often choose a hospital using only distance or familiarity because waiting-time and accessibility information is fragmented. Our survey of 89 participants found strong demand for clearer information before travelling to a facility.

<div class="stat-grid">
  <div class="stat-card"><strong>89</strong><span>survey participants</span></div>
  <div class="stat-card"><strong>83%</strong><span>experienced long waits</span></div>
  <div class="stat-card"><strong>82%</strong><span>wanted wait-time information</span></div>
  <div class="stat-card"><strong>71%</strong><span>valued hospital reviews</span></div>
</div>

## Our Solution

- Compare hospitals using predicted waiting time and distance.
- Switch between the **fastest** and **closest** recommendation priorities.
- Display prediction confidence and warnings when uncertainty is high.
- Review hospital, department, accessibility, and language-support information.
- Continue to navigation after selecting a facility.

## Model Evaluation

The team trained and evaluated an **XGBoost regression model** using historical Hong Kong hospital waiting-time data.

| Metric | Held-out Result |
|---|---:|
| Mean Absolute Error (MAE) | **5.93 minutes** |
| Root Mean Squared Error (RMSE) | **8.42 minutes** |
| R² | **0.8105** |

One demonstration output predicted a wait of **35.3 minutes**, with **83.1% confidence** and an uncertainty interval of **±6.0 minutes**. See the [Results page]({{ '/posts/results/' | relative_url }}) for the evaluation context and limitations.

## Research and Validation

The project combined technical development with user research:

- **89-person survey** covering waiting-time experiences and desired features.
- Interviews with healthcare professionals, including **Dr. Vito LaRocca, MD, MPH**, and **Charlene DiLoffi**.
- Review of public hospital-reporting systems and historical waiting-time datasets.
- Iterative requirements, architecture, UML modelling, prototype testing, and presentation feedback.

## Implemented Prototype vs. Future System

| Implemented in the prototype | Proposed future integration |
|---|---|
| Hospital comparison interface | Direct live hospital APIs |
| Precomputed XGBoost prediction outputs | Continuously refreshed predictions |
| Fastest/closest ranking | Crowdsourced verified queue updates |
| Confidence display and warnings | Production monitoring and retraining |
| Hong Kong hospital information | Expansion to additional regions |

## Project Team

- **Jacob Smith — Project Manager**
- **Bien Alolod**
- **Sadia Islam**
- **Hanz Ranen**
- **Daisuke Terauchi**
- **Mahiro Ueda**
- **Ibuki Yasuda**

Every result on this site represents the work of PBL3 Group D.
