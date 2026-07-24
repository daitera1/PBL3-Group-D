---
layout: default
title: "PBL3 Group D Project"
date: 2026-07-24
---

Welcome to the **PBL3 Group D** project website. Our team developed **CarePath Navigator**, a smart healthcare prototype that helps users compare hospitals using predicted waiting times, distance, and hospital information.

## Project Overview

Patients often travel to a hospital without knowing how long they may have to wait or whether another suitable facility is available nearby. CarePath Navigator was designed to make this decision clearer by presenting hospital information in one place and allowing users to compare the **fastest** and **closest** options.

The final prototype includes hospital comparison, predicted waiting times, confidence information, recommendation preferences, and a navigation flow. The system is an academic decision-support prototype and does not provide medical diagnoses or emergency guidance.

## Data Scope

Our early proposal investigated the United Kingdom's NHS reporting systems as an example of an ideal future live-data integration. Because the relevant NHS API requires authorization, the final implementation and XGBoost evaluation used public **Hong Kong hospital waiting-time data**. The NHS work remains part of our research and future-system design, but it was not used to calculate the final model results.

## Key Results

| Project Result | Outcome |
|---|---:|
| Survey participants | **89** |
| Participants who experienced long hospital waits | **83%** |
| Interest in waiting-time information | **82%** |
| XGBoost Mean Absolute Error | **5.93 minutes** |
| XGBoost Root Mean Squared Error | **8.42 minutes** |
| XGBoost R² | **0.8105** |

For the full evaluation, limitations, and delivered features, see the [Results page]({{ '/posts/results/' | relative_url }}).

You can also open the [CarePath Navigator prototype](https://route-to-care-ai.lovable.app).

## Project Members

- **Jacob Smith - Project Manager**
- **Bien Alolod**
- **Sadia Islam**
- **Hanz Ranen**
- **Daisuke Terauchi**
- **Mahiro Ueda**
- **Ibuki Yasuda**

---
