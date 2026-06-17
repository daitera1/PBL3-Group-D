---
layout: default
title: "System Design Document"
date: 2026-04-28
permalink: /posts/system-design/
---

<style>
.toc-link {
  color: #000000;
  text-decoration: none;
}
.toc-link:hover {
  text-decoration: underline;
}
h1, h2, h3, h4, h5, h6 {
  scroll-margin-top: 2em;
}
h1:target, h2:target, h3:target, h4:target, h5:target, h6:target {
  background: none;
  outline: none;
  animation: none;
}
</style>

<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 720px; margin: 1.5em 0; background-color: #EDEDED; border-radius: 8px; padding: 1.2em 1.5em;">
<details>
<summary style="font-weight: bold; font-size: 1.1em; cursor: pointer; margin-bottom: 0.8em;">Table of Contents</summary>
<div style="padding-left: 0.5em; line-height: 2;">

<div style="margin-left: 0.5em;">
• <a href="#preface" class="toc-link"><strong>Preface</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#version-history" class="toc-link">1.2 Version History</a></span><br>
• <a href="#introduction" class="toc-link"><strong>Introduction</strong></a><br>
• <a href="#system-context-diagram" class="toc-link"><strong>System Context Diagram</strong></a><br>

• <a href="#relationship-description" class="toc-link"><strong>Relationship Description</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#patient->recommendation-engine" class="toc-link">Patient -> Recommendation Engine</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#recommendation-engine->hospital" class="toc-link">Recommendation Engine -> Hospital</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#recommendation-engine->wait-time-prediction" class="toc-link">Recommendation Engine -> Wait Time Prediction</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#wait-time-prediction◇queue-data" class="toc-link">Wait Time Prediction ◇ Queue Data</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#hospital◆department" class="toc-link">Hospital ◆ Department</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#hospital◆language-support" class="toc-link">Hospital ◆ Language Support</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#hospital◆queue-data" class="toc-link">Hospital ◆ Queue Data</a></span><br>
• <a href="#state-diagram" class="toc-link"><strong>State Diagram</strong></a><br>
• <a href="#use-case-diagram" class="toc-link"><strong>Use Case Diagram</strong></a><br>
• <a href="#component-diagram" class="toc-link"><strong>Component Diagram</strong></a><br>
• <a href="#sequence-diagram" class="toc-link"><strong>Sequence Diagram</strong></a><br>
• <a href="#deployment-diagram" class="toc-link"><strong>Deployment Diagram</strong></a><br>

</div>

</div>
</details>
</div>

---

## Preface


### Version History

| Version | Date | Description |
| ------- | ---- | ----------- |
| 1.0 | 2026-06-17 | Initial version |


### Introduction

The CarePath Navigator project can be defined as an application that aims at providing efficient assistance in finding the best hospitals through its functionalities. This particular system design document explains the architecture and structure of the proposed system. It further describes how various inputs received from the user such as location and search options are processed in order to provide best-fit hospitals with predicted wait times. The following sections present several diagrams which include System Context, Class Diagrams, State Diagrams, Use Case Diagrams, Component Diagrams, Activity Diagrams, and Sequence Diagrams. These diagrams will assist with our project implementation in a significant way.



## System Context Diagram

![System Context Diagram]({{ "/images/system%20context.png" | relative_url }})


This diagram shows the system context of CarePath Navigator. Patients submit search requests, location data, and language preferences to the application, while hospitals provide department information and queue data. The system processes this information and returns hospital recommendations and estimated waiting times to patients.



## Class Diagram

![Class Diagram]({{ "/images/Class%20Diagram.jpg" | relative_url }})


This class diagram illustrates how patients submit their location and language information to the system. The Recommendation Engine retrieves hospital information and waiting-time predictions to rank available hospitals. Wait Time Prediction uses queue data provided by hospitals, while each hospital manages its own departments, language support services, and queue information. Together, these components provide patients with suitable hospital recommendations and estimated waiting times.


| Class | Description | 
|-------|-------------|
| **Patient** | Represents a user of the application. Stores the patient's current location and preferred language. Methods allow updating this information. |
| **Recommendation Engine** | Generates and ranks hospital recommendations based on patient information and waiting-time predictions. |
| **Hospital** | Represents a healthcare facility. Stores basic information such as hospital name and address. |
| **Department** | Represents a medical department within a hospital, including its name and description. |
| **Language Support** | Stores information about languages supported by a hospital and provides translation-related functions. |
| **Queue Data** | Stores real-time queue information, including the number of waiting patients and timestamp data. |
| **Wait Time Prediction** | Estimates waiting times using queue data and calculates prediction confidence levels. |



## Relationship Description

### 1. Patient → Recommendation Engine 

Patients provide information to the Recommendation Engine to receive hospital recommendations.

### 2. Recommendation Engine → Hospital

The Recommendation Engine uses information from multiple hospitals to generate recommendations.

### 3. Recommendation Engine → Wait Time Prediction

The Recommendation Engine uses waiting-time predictions when ranking hospitals.

### 4. Wait Time Prediction ◇ Queue Data 

Waiting-time predictions are generated using queue information collected from hospitals.

### 5. Hospital ◆ Department 

A hospital consists of one or more departments. Departments cannot exist without a hospital.

### 6. Hospital ◆ Language Support 

Language support information belongs to a specific hospital and is removed if the hospital is deleted.

### 7. Hospital ◆ Queue Data 

Queue data is maintained by a hospital and does not exist independently from it.



## State Diagram

![State Diagram]({{ "/images/State%20Diagram.png" | relative_url }})


This state diagram illustrates the complete user journey within CarePath Tech, beginning with hospital search preferences and ending with treatment completion and review submission. The predicted wait time is generated using historical wait-time records and a machine learning model, which also produces a confidence score representing the reliability of the prediction. If the estimated wait time exceeds 60 minutes or the confidence score falls below 70%, the application displays a warning popup stating "The predicted wait time may be longer than expected or the prediction confidence is low. Would you still like to continue with this hospital?" Selecting Continue returns the user to the hospital search process to consider alternative hospitals, while selecting Cancel terminates the current session and ends the process.



## Use Case Diagram

![Use Case Diagram]({{ "/images/Use%20Case%20Diagram.png" | relative_url }})


This use case diagram shows how the patient interacts with the CarePath Navigator system to search for hospitals, view recommendations and waiting times, select a hospital, obtain navigation, and submit reviews. The Hospital System provides hospital and queue information that supports the application's functions.



## Components Diagram

![Components Diagram]({{ "/images/Component%20Diagram.jpg" | relative_url }})


This component diagram shows the software structure of CarePath Navigator. It is divided into four main layers to show how data flows through our system:

* **User Frontend**: Handles what the user sees, including the UI Module for searching hospitals, the GPS Service for location with privacy filters, and User Settings for saving preferences.

* **System Backend**: The core brain of the app. It collects fresh data (Data Collection) , cleans it (Data Preprocessing), predicts wait times (Wait-Time Prediction), ranks hospitals (Recommendation Engine), and prevents overcrowding (Load Balancing).

* **Data Layer**: Stores the system data, including History Storage for past wait-time information and Cache Storage as a backup.

* **External Systems & APIs**: Outside data sources that our system connects with, such as the NHS WLMDS API , Hospital APIs , and the Mobile GPS Service.

Adding to that, all communication between these components is fully encrypted to protect user privacy.



## Sequence Diagram

![Sequence Diagram]({{ "/images/Sequence%20Diagram.png" | relative_url }})


This sequence diagram describes the process of searching for hospitals, generating predicted wait times, and providing navigation assistance within CarePath Tech. The prediction system retrieves historical wait-time records from the hospital database and applies a machine learning model to estimate waiting times and confidence scores. If the estimated wait time exceeds 60 minutes or the confidence score is below 70%, the mobile application displays a warning popup suggesting that the user consider another hospital. Navigation information, including route, estimated travel time, and distance, is obtained through a navigation service utilizing real-time traffic data available through the Google Maps API when available.



## Deployment Diagram

![Deployment Diagram]({{ "/images/Deployment%20Diagram.jpg" | relative_url }})


