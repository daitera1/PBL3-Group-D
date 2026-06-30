---
layout: default
title: "System Architecture"
date: 2026-04-28
permalink: /posts/system-architecture/
---


## Introduction


The system architecture of the hospital recommendation and wait-time prediction system follows a client-server model, separating the user interface, application logic, and data storage into distinct layers. This separation ensures modularity, maintainability, and scalability of the system.

The system is composed of three primary containers:

1. **Web/Mobile Application**: The frontend interface for patients to search for hospitals and view recommendations.

2. **Backend API Server**: The core application logic handling hospital searching, recommendation generation, and prediction requests.

3. **MySQL Database**: The data storage for hospital information, historical queue data, and prediction records.


This architecture allows each component to be developed, deployed, and scaled independently, ensuring a robust and efficient system.


## Container Diagram


The container diagram illustrates the high-level architecture of the hospital recommendation and wait-time prediction system. The system is divided into three main containers: the Web/Mobile Application, the Backend API Server, and the MySQL Database.


![Container Diagram]({{ "/images/Container%20Diagram.png" | relative_url }})


Patients access the system through the React-based frontend using HTTPS. The frontend provides user interfaces for searching hospitals, viewing recommendations, and displaying predicted waiting times. It communicates with the backend by sending REST API requests.
The Backend API Server, implemented with Python Flask, contains the core business logic of the system. It handles hospital searching, recommendation generation, request validation, and prediction requests. The Prediction Service uses an embedded XGBoost machine learning model to estimate hospital waiting times based on historical queue data and user inputs. Since the prediction model is integrated into the backend rather than deployed independently, it is treated as an internal service instead of a separate container.
The MySQL database stores hospital information, historical queue data, prediction history, and system settings. The backend reads from and writes to the database to retrieve hospital information and store prediction-related data.
Overall, this architecture separates the presentation layer, application logic, and data storage, making the system modular, maintainable, and scalable.


## Pipe and Filter Diagram


