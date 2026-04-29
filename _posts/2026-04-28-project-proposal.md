---
layout: default
title: "Project Proposal"
date: 2026-04-28
permalink: /posts/project-proposal/
---

# Smart Healthcare Application - Real-Time Queue Estimator and Hospital Finder

## Overview

Our project focuses on developing a smart hospital finder application designed to help users locate hospitals more efficiently. The app provides real-time and predicted wait times, along with key information such as hospital specialties, supported languages, and accepted insurance. It is aimed at patients who need quick and reliable access to healthcare, especially in unfamiliar areas or urgent situations. By combining live data, historical trends, and user input, the app helps users choose the best hospital based on their needs. This improves overall efficiency in healthcare access and reduces unnecessary waiting times.

---

## Problem Statement

In many cities, hospitals are often overcrowded and patients have to deal with long waiting times. Even though there are multiple hospitals available, people usually don’t have access to real-time information about how busy each hospital is. Because of this, most patients just go to the closest hospital without knowing how long they will have to wait.
This leads to some hospitals becoming overloaded while others are not fully used. It makes the system inefficient and increases stress for patients, especially for people who need urgent care. On top of that, it is also hard to find important information like hospital specialties, language support, or what insurance is accepted, since there is no single platform that shows everything clearly.
Current solutions, like hospital websites or map apps, don’t really solve this problem because they don’t show live conditions or accurate wait times. As a result, patients cannot make informed decisions about where to go.
Due to this, there is a need for a smarter system that can provide real-time and predicted information to help patients choose the best hospital. This could reduce waiting times, balance patient flow, and make healthcare access easier and more efficient.

---

## Vision & Goals

The first and foremost vision for the project is to create an intuitive, accessible digital platform that empowers patients, carers, and healthcare professionals across the United Kingdom to view, track, and understand hospital waiting times — reducing uncertainty, improving patient experience, and supporting informed decision-making across the healthcare journey.
Millions of patients across the UK are currently waiting for hospital treatment, diagnostic tests, or specialist consultations. Existing mechanisms for checking waiting times are fragmented, inconsistent across trusts, and often inaccessible to the general public. Since this creates anxiety for patients, inefficiencies for administrators, and a lack of transparency in the healthcare system, our project can help them in ways that ease their struggles.
We are aiming for a future where every patient can access organized, real-time waiting time information, assisting them plan it out , prepare and be informed throughout their healthcare journey.

Firstly, our goal is to be transparent with the patients to provide clear, honest and updated waiting time data across UK trust hospitals, special hospitals and regions as well. By filtering the data that is currently difficult to read, it will be more accessible to concerning patients.
Secondly, this project assists with patient empowerment since this will provide patients agency over their healthcare experience by enabling them to compare waiting times across trusts, set up notifications, and understand their position on waiting lists.
Since the source data is directly from NHS England, NHS Digital, and official trust-level reporting, this ensures accuracy and maintains public confidence in the platform.
This project also aims to deliver a clean, jargon-free interface that works equally well for a first-time user and a frequent visitor, prioritising clarity over complexity.
Lastly, using design for inclusivity from the ground up, meeting WCAG 2.1 AA (the international standard for web accessibility, requiring digital content to be perceivable, operable, understandable, and robust for users) accessibility standards, supporting screen readers, multiple languages, and varying levels of digital literacy.

---

## Objectives – App Features and What It Does

### Purpose of the Application

The objective of this project is to develop a Smart Hospital Finder Application (SmartCare Navigator) that helps users choose appropriate healthcare facilities based on location, waiting time, and accessibility. The system focuses on mild healthcare needs and clinic-level visits, without providing medical diagnoses or handling emergency cases.
The application uses real-time, historical, and crowdsourced data to provide waiting time estimates and simple recommendations. It aims to reduce waiting times, improve patient distribution, and make hospital information easier to access in one platform, while maintaining user privacy.

### Core Objectives

* Provide **real-time and predicted waiting times** using live, historical, and crowdsourced data
* Show the **closest healthcare facilities** based on user location
* Display **hospital specialties and language support**
* Provide a **recommendation system** based on wait time, distance, and user preferences
* Include a **crowdsourcing feature** for wait times and simple user feedback
* Offer **general guidance notifications** without giving medical diagnoses
* Help **reduce overcrowding** by guiding users to less busy facilities

### Addition System Features

* Show **why a hospital is recommended** (e.g., shorter wait time or closer distance)
* Allow users to set **preferences** (faster service vs. closer distance)
* Display **predicted busy hours**
* Include a **visit intent feature** to improve prediction accuracy
* Provide **anonymous feedback summaries**
* Maintain a **privacy-focused design** with minimal data collection

---

## Data Acquisition – Finding Datasets

API to access the Waiting List Minimum Data Set (WLMDS) - The national electronic databases of NHS patient waiting list details such as date of birth, a patient’s care pathway and the date they began waiting.
We can access:
* Search for patients
* Get patient details
* View when a patient began waiting for a procedure
* View the care pathway a patient is on
* View the trust / organisation their care pathway is with
We can view:
* Patient waiting date
* Patient pathway identifier
* Treatment function code
* Organisation providing the care pathway
* Census date
However, this API is for internal use only (NHS App), so currently we are asking NHS England to use the API [1]

---

## Data Science – Predicting Wait Times

### Preprocessing

The collected hospital waiting-time data from the API will undergo preprocessing to ensure consistency, reliability, and suitability for predictive modeling. Raw waiting-time data gathered from public hospital queue platforms will first be cleaned by handling missing values, removing duplicate entries, and standardizing inconsistent hospital naming conventions. Time-based features will then be extracted from timestamps, including hour of day, day of week, weekend/weekday and holiday indicators, as these temporal factors are strongly associated with hospital congestion patterns. Lag-based historical features will also be generated, such as previous recorded waiting time, rolling average wait over recent intervals, and congestion trends over time . Finally, categorical variables such as hospital type or department will be encoded into machine-readable form for use in predictive models.

### Data Techniques 

In order to estimate future hospital waiting times, the system will implement a supervised regression-based prediction model (preferably using LightGBM / XGBoost). The predictive model will leverage both temporal features and historical queue-state information, including:
* Current waiting time
* Previous waiting times
* Rolling average queue duration
* Time of day / Day of week
* Hospital congestion level
* Hospital-specific patterns
A baseline historical-average model will first be established to benchmark the performance of the model. After which the gradient boosting model will be trained and evaluated against it. Model performance will then be assessed using regression metrics such as MAE (Mean Absolute Error) and RMSE (Root Mean Squared Error) to measure prediction accuracy.

### Data Visualization

The processed and predicted waiting-time data will be visualized through a real-time hospital map with live/predicted waiting times and color-coded congestion indicators.

---

## Existing Research - Applications/Prototypes

To support the development of our hospital finder application, we reviewed existing apps and government data from 2025 to 2026 to understand current solutions and identify gaps.

### Existing Applications

Platforms such as Zocdoc and Google Maps are useful for finding hospitals and booking appointments. However, they do not provide **real-time information on hospital busyness**, making it difficult for users to choose the fastest option in urgent situations. In addition, many apps are **too complex**, which can be challenging for users under stress.

### Government Data

* The Hong Kong Hospital Authority provides **real-time waiting time data**, updated frequently, showing the value of live data systems [2]
* NHS England reports highlight ongoing issues with **long waiting times**, especially in emergency care [3]
* Data from the Ministry of Health, Labour and Welfare shows concerns about the **efficiency of accessing healthcare services** [4]

---

## Risks and Privacy

### Risks
**Incorrect Data**
Waiting time predictions may be inaccurate or outdated, especially during peak hours or emergencies. This can mislead patients and cause them to make poor decisions about where to go.

**Overcrowding Effect**
If many users identify the same hospital as having the shortest wait time,
they may all go there at once, leading to unexpected overcrowding. As a result, the system may unintentionally create longer waiting times.

**Inequality of Access**
Hospitals with better technology or digital infrastructure may attract more patients, while smaller or less-equipped hospitals may be overlooked. In addition, elderly patients or those who are not familiar with digital devices may be excluded from the benefits of the system.


### Privacy

**Personal Health Data Leakage**
Sensitive information such as patients’ names, age, gender, ID, and medical conditions may be exposed if the system is not properly secured. This could lead to serious ethical and legal issues.

**Location Tracking**
The application may track users’ locations and hospital visits. If this data is misused or leaked, it could reveal personal behavior patterns or even health conditions.

**Lack of User Control**
Users may not fully understand what data is being collected or how it is used. Providing transparency and allowing users to control their data is important.

---

## Sustainability

**Data Sustainability**
The web application must continuously maintain servers, APIs, and real-time data updates. This requires stable infrastructure and long-term technical support.

**Hospital Integration**
The system depends on cooperation from hospitals. However, not all hospitals are willing or able to share data, and their systems may not be compatible.

---

## References

[1] Hong Kong Hospital Authority. (2026). Accident and emergency waiting time data. Retrieved from https://www.ha.org.hk

[2] NHS England. (2026). A&E waiting time statistics. Retrieved from https://www.england.nhs.uk

[3] Ministry of Health, Labour and Welfare. (2026). Healthcare system survey. Retrieved from https://www.mhlw.go.jp

[4] Limiri, D. (2025). The impact of long wait times on patient health outcomes: The growing NHS crisis. Premier Journal of Public Health. https://doi.org/10.70389/PJPH.100020

[5] Yaduvanshi, D., Sharma, A., & More, P. V. (2019). Application of queuing theory to optimize waiting time in hospital operations. Operations and Supply Chain Management, 12(3), 165–174. https://doi.org/10.31387/oscm0380240

[6] Moore, M. D. (2022). Waiting for the doctor: Managing time and emotion in the British National Health Service, 1948–80. Twentieth Century British History, 33(2), 203–229. https://doi.org/10.1093/tcbh/hwab040

[7] Dong, J., Yom-Tov, E., & Yom-Tov, G. B. (2018). The impact of delay announcements on hospital network coordination and waiting times. Management Science. https://doi.org/10.1287/mnsc.2018.3048

[8] Perdana, R. H. Y., et al. (2019). Hospital queue control system using QR code as verification of patient’s arrival. International Journal of Advanced Computer Science and Applications, 10(8). https://doi.org/10.14569/ijacsa.2019.0100847

[9] Li, X., et al. (2022). Using artificial intelligence to reduce queuing time and improve satisfaction in pediatric outpatient service: A randomized clinical trial. Frontiers in Pediatrics, 10. https://doi.org/10.3389/fped.2022.929834
