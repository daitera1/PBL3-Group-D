---
layout: default
title: "System Design Document"
date: 2026-04-28
permalink: /posts/system-design/
---


## Preface


### Version History

| Version | Date | Description |
| ------- | ---- | ----------- |
| 1.0 | 2026-06-18 | Initial version |


### Introduction

The CarePath Navigator project can be defined as an application that aims at providing efficient assistance in finding the best hospitals through its functionalities. This particular system design document explains the architecture and structure of the proposed system. It further describes how various inputs received from the user such as location and search options are processed in order to provide best-fit hospitals with predicted wait times. The following sections present several diagrams which include System Context, Class Diagrams, State Diagrams, Use Case Diagrams, Component Diagrams, Activity Diagrams, and Sequence Diagrams. These diagrams will assist with our project implementation in a significant way.



## System Context Diagram

![System Context Diagram]({{ "/images/system%20context.png" | relative_url }})


This diagram shows the system context of CarePath Navigator. Patients submit search requests, location data, and language preferences to the application, while hospitals provide department information and queue data. The system processes this information and returns hospital recommendations and estimated waiting times to patients.



## Class Diagram

![Class Diagram]({{ "/images/Class%20Diagram.png" | relative_url }})


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

![State Diagram]({{ "/images/State%20Diagram.jpg" | relative_url }})


This state diagram illustrates the complete patient journey while using CarePath Navigator, from searching for hospitals to receiving treatment and submitting a review. The system provides hospital recommendations, predicted waiting times, and navigation assistance to help users make informed decisions. If the estimated wait time is considered too long, a warning popup message stating "Estimated wait time is longer than expected. Do you still want to continue with this hospital?" is displayed. Selecting Continue allows the user to proceed with the selected hospital, while selecting Cancel terminates the current process.




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




## Deployment Diagram

![Deployment Diagram]({{ "/images/Deployment%20Diagram.jpg" | relative_url }})