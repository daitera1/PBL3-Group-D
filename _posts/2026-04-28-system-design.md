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
<span style="margin-left: 1.8em;">○ <a href="#version-history" class="toc-link">Version History</a></span><br>
• <a href="#introduction" class="toc-link"><strong>Introduction</strong></a><br>
• <a href="#system-context-diagram" class="toc-link"><strong>System Context Diagram</strong></a><br>
• <a href="#class-diagram" class="toc-link"><strong>Class Diagram</strong></a><br>
• <a href="#relationship-description" class="toc-link"><strong>Relationship Description</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#1-patient--recommendation-engine" class="toc-link">1. Patient → Recommendation Engine</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#2-recommendation-engine--hospital" class="toc-link">2. Recommendation Engine → Hospital</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#3-recommendation-engine--wait-time-prediction" class="toc-link">3. Recommendation Engine → Wait Time Prediction</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#4-wait-time-prediction--queue-data" class="toc-link">4. Wait Time Prediction ◇ Queue Data</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#5-hospital--department" class="toc-link">5. Hospital ◆ Department</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#6-hospital--language-support" class="toc-link">6. Hospital ◆ Language Support</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#7-hospital--queue-data" class="toc-link">7. Hospital ◆ Queue Data</a></span><br>
• <a href="#state-diagram" class="toc-link"><strong>State Diagram</strong></a><br>
• <a href="#use-case-diagram" class="toc-link"><strong>Use Case Diagram</strong></a><br>
• <a href="#components-diagram" class="toc-link"><strong>Components Diagram</strong></a><br>
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


This diagram shows the system context of CarePath Navigator. Patients submit search requests and location data to the application, while hospitals provide department information and queue data. The system processes this information and returns hospital recommendations and estimated waiting times to patients.



## Class Diagram

![Class Diagram]({{ "/images/Class%20Diagram.jpg" | relative_url }})


The class diagram represents a CarePath Navigator application that recommends suitable hospitals and predicts waiting times. The Patient class stores the user’s current location and selected department. The patient requests hospital recommendations through the Recommendation Engine. The Recommendation Engine uses hospital information, patient location, and predicted waiting times to filter, rank, and generate recommendations. The Hospital class stores general hospital information such as name, address, and description, while the Department class represents the medical departments available within a hospital. A hospital contains one or more departments, which is represented by a composition relationship. The Hospital API and Historical Wait Time Data classes have different roles. Hospital API provides current operational data, such as the number of patients and current waiting time, whereas Historical Wait Time Data stores past waiting records collected from external datasets. Both sources provide data to the Wait Time Prediction class, which calculates predicted waiting times and confidence values. Finally, the predicted waiting time is passed to the Recommendation Engine, allowing hospitals to be ranked not only by distance but also by expected waiting time. This separation of responsibilities improves maintainability and allows prediction and recommendation functions to be updated independently.



## State Diagram

![State Diagram]({{ "/images/State%20Diagram.png" | relative_url }})


This state diagram illustrates the complete user journey within CarePath Tech, beginning with hospital search preferences and ending with treatment completion and review submission. The predicted wait time is generated using historical wait-time records and a machine learning model, which also produces a confidence score representing the reliability of the prediction. If the estimated wait time exceeds 60 minutes or the confidence score falls below 70%, the application displays a warning popup stating "The predicted wait time may be longer than expected or the prediction confidence is low. Would you still like to continue with this hospital?" Selecting Continue returns the user to the hospital search process to consider alternative hospitals, while selecting Cancel terminates the current session and ends the process.



## Use Case Diagram

![Use Case Diagram]({{ "/images/Use%20Case%20Diagram.jpg" | relative_url }})


This use case diagram shows how the patient interacts with the CarePath Navigator system to search for hospitals, view recommendations and waiting times, select a hospital, obtain navigation, and submit reviews. The Hospital System provides hospital and queue information that supports the application's functions.



## Components Diagram

![Components Diagram]({{ "/images/Components%20Diagram.jpg" | relative_url }})


This component diagram shows the simplified software structure of SmartCare Navigator. It is divided into five main layers to show how data flows through our system:

* **Client Layer**: Contains the Mobile Application and Web Application, which send the user’s location and selected department to the UI Controller.

* **Application Services Layer**: Handles the main system logic. The Recommendation Service filters facilities, calculates distance, ranks hospitals, and generates recommendations. The Wait-Time Prediction Service predicts waiting times and calculates confidence using historical data.

* **Data Acquisition Layer**: Collects current hospital information from the Hospital / Facility Update System through the API Integration Adapter. The Data Preprocessing Service cleans the data before storing it.

* **Data Storage Layer**: Contains the Facility Database, Historical Wait-Time Database, Cache / Fallback Store, and System Log Store.

* **External Systems Layer**: Provides GPS/map data and hospital update data used by the system.



## Sequence Diagram

![Sequence Diagram]({{ "/images/Sequence%20Diagram.png" | relative_url }})


This sequence diagram describes the process of searching for hospitals, generating predicted wait times, and providing navigation assistance within CarePath Tech. The prediction system retrieves historical wait-time records from the hospital database and applies a machine learning model to estimate waiting times and confidence scores. If the estimated wait time exceeds 60 minutes or the confidence score is below 70%, the mobile application displays a warning popup suggesting that the user consider another hospital. Navigation information, including route, estimated travel time, and distance, is obtained through a navigation service utilizing real-time traffic data available through the Google Maps API when available.



## Deployment Diagram

![Deployment Diagram]({{ "/images/Deployment%20Diagram.jpg" | relative_url }})


