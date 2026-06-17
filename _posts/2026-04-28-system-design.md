---
layout: default
title: "System Design"
date: 2026-04-28
permalink: /posts/system-design/
---

## Overview

## Context Diagram

![Context Diagram]({{ "/images/Context%20Diagram.png" | relative_url }})


This diagram shows the system context of CarePath Navigator. Patients submit search requests, location data, and language preferences to the application, while hospitals provide department information and queue data. The system processes this information and returns hospital recommendations and estimated waiting times to patients.


## Class Diagram

![Class Diagram]({{ "/images/Class%20Diagram.png" | relative_url }})


The patient submits location and language information to the system. The Recommendation Engine retrieves hospital information and waiting-time predictions to rank available hospitals. Wait Time Prediction uses queue data provided by hospitals, while each hospital manages its own departments, language support services, and queue information. Together, these components provide patients with suitable hospital recommendations and estimated waiting times.


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



This diagram illustrates the different states a patient experiences while using CarePath Navigator. The process begins when the application is opened and the patient sets their preferences before searching for hospitals. The system generates recommendations, displays hospital information, and provides predicted waiting times along with confidence scores. The patient then decides whether the waiting time is acceptable. If the waiting time is not acceptable, the patient can continue searching for alternative hospitals. If the waiting time is acceptable, the patient selects a hospital, receives navigation guidance, travels to the hospital, waits for treatment, receives medical care, and finally submits a review after the visit. This diagram demonstrates the overall user journey and decision-making process within the system.



