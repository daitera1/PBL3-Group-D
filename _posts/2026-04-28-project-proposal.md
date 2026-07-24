---
layout: default
title: "Project Proposal"
date: 2026-04-28
permalink: /posts/project-proposal/
---

> **Development path:** The team initially studied NHS reporting systems as an example of an ideal live-data service. Because the relevant NHS API requires authorization, the final prototype and model evaluation used public Hong Kong hospital waiting-time data. The NHS work remains part of the proposed future architecture. See the [Results page]({{ '/posts/results/' | relative_url }}) for the final evaluation.

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
• <a href="#project-proposal-summary" class="toc-link"><strong>Project Proposal Summary</strong></a><br>
• <a href="#1-problem-statement" class="toc-link"><strong>1. Problem Statement</strong></a><br>
• <a href="#2-vision--goals" class="toc-link"><strong>2. Vision &amp; Goals</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#21-vision" class="toc-link">2.1 Vision</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#22-goals" class="toc-link">2.2 Goals</a></span><br>
• <a href="#3-objectives--app-features-and-what-it-does" class="toc-link"><strong>3. Objectives – App Features and What It Does</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#31-purpose-of-the-application" class="toc-link">3.1 Purpose of the Application</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#32-core-objectives" class="toc-link">3.2 Core Objectives</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#33-additional-system-features" class="toc-link">3.3 Additional System Features</a></span><br>
• <a href="#4-data-acquisition--finding-datasets" class="toc-link"><strong>4. Data Acquisition – Finding Datasets</strong></a><br>
• <a href="#5-data-science--predicting-wait-times" class="toc-link"><strong>5. Data Science – Predicting Wait Times</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#51-preprocessing" class="toc-link">5.1 Preprocessing</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#52-data-techniques" class="toc-link">5.2 Data Techniques</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#53-data-visualization" class="toc-link">5.3 Data Visualization</a></span><br>
• <a href="#6-existing-research---applicationprototypes" class="toc-link"><strong>6. Existing Research – Applications/Prototypes</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#61-existing-applications" class="toc-link">6.1 Existing Applications</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#62-government-data" class="toc-link">6.2 Government Data</a></span><br>
• <a href="#7-risks-and-privacy" class="toc-link"><strong>7. Risks and Privacy</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#71-risks" class="toc-link">7.1 Risks</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#72-privacy" class="toc-link">7.2 Privacy</a></span><br>
• <a href="#8-sustainability" class="toc-link"><strong>8. Sustainability</strong></a><br>
• <a href="#references" class="toc-link"><strong>References</strong></a>
</div>

</div>
</details>
</div>

# Smart Healthcare Application - Real-Time Queue Estimator and Hospital Finder

---

## Project Proposal Summary

This project aims to develop a Smart Hospital Finder Application (CarePath Navigator) that helps users choose appropriate healthcare facilities based on location, waiting time, and accessibility. The system is designed for mild healthcare needs and clinic-level visits, and does not provide medical diagnoses or handle emergency cases.

In many cities, hospitals are often overcrowded, and patients lack access to real-time information about waiting times. As a result, most people go to the nearest hospital without knowing how long they will have to wait. This leads to inefficient patient distribution, longer waiting times, and increased stress, especially in urgent situations. Existing solutions such as map apps or hospital websites do not provide accurate or real-time information, making it difficult for users to make informed decisions.

To address this, CarePath Navigator combines historical waiting-time patterns with hospital and location information to produce predicted waiting times and recommendations. It also displays information such as hospital specialties, language support, and distance. The final class prototype uses public Hong Kong data, while authorized live hospital APIs and verified crowdsourced updates are part of the ideal future system.

The system also focuses on simplicity, accessibility, and privacy. It provides clear and easy-to-understand information, supports international users, and minimizes data collection. By centralizing hospital information into one platform, the application aims to improve decision-making, reduce waiting times, and create a more efficient healthcare experience.

---

## 1. Problem Statement

In many cities, hospitals are often overcrowded and patients have to deal with long waiting times. Even though there are multiple hospitals available, people usually don’t have access to real-time information about how busy each hospital is. Because of this, most patients just go to the closest hospital without knowing how long they will have to wait.
This leads to some hospitals becoming overloaded while others are not fully used. It makes the system inefficient and increases stress for patients, especially for people who need urgent care. On top of that, it is also hard to find important information like hospital specialties, language support, or what insurance is accepted, since there is no single platform that shows everything clearly.
Current solutions, like hospital websites or map apps, don’t really solve this problem because they don’t show live conditions or accurate wait times. As a result, patients cannot make informed decisions about where to go.
Due to this, there is a need for a smarter system that can provide real-time and predicted information to help patients choose the best hospital. This could reduce waiting times, balance patient flow, and make healthcare access easier and more efficient.

---

## 2. Vision & Goals

### 2.1 Vision

Our vision is to create an intuitive and accessible platform that helps patients understand hospital waiting times before they travel. CarePath Navigator brings predicted waits, distance, and practical hospital information into one place so users can make a more informed choice.

The final prototype demonstrates this idea using public Hong Kong hospital data. In a future real-world version, the same architecture could connect to authorized live sources such as hospital systems or NHS reporting services. This distinction allows the prototype to remain realistic about its current data while showing how the system could grow.

### 2.2 Goals

The project goals are to:

* Present predicted waiting times with clear source, timestamp, and confidence information.
* Allow users to compare the fastest and closest suitable hospitals.
* Make hospital, department, language-support, and accessibility information easier to find.
* Keep the interface understandable for first-time users and people under stress.
* Minimize the collection of personal information and treat location data carefully.
* Design an architecture that could later accept authorized live data from hospital systems, including services similar to those investigated through the NHS.

---

## 3. Objectives – App Features and What It Does

### 3.1 Purpose of the Application

The objective of this project is to develop a Smart Hospital Finder Application (CarePath Navigator) that helps users choose appropriate healthcare facilities based on location, waiting time, and accessibility. The system focuses on mild healthcare needs and clinic-level visits, without providing medical diagnoses or handling emergency cases.
The final prototype uses historical Hong Kong hospital data to provide waiting-time estimates and simple recommendations. The proposed full system would extend this with authorized live data and verified crowdsourced updates. It aims to reduce uncertainty, improve patient distribution, and make hospital information easier to access while maintaining user privacy.

### 3.2 Core Objectives

* Provide predicted waiting times using historical data
* Show the closest healthcare facilities based on user location
* Display hospital specialties and language support
* Provide a recommendation system based on wait time, distance, and user preferences
* Design future support for live data, crowdsourced updates, and simple user feedback
* Offer general guidance notifications without giving medical diagnoses
* Help reduce overcrowding by guiding users to less busy facilities

### 3.3 Additional System Features

* Show why a hospital is recommended (e.g., shorter wait time or closer distance)
* Allow users to set preferences (faster service vs. closer distance)
* Display predicted busy hours
* Include a visit intent feature to improve prediction accuracy
* Provide anonymous feedback summaries
* Maintain a privacy-focused design with minimal data collection

---

## 4. Data Acquisition – Finding Datasets

### Final Prototype Data

The final implementation uses public waiting-time information from the Hong Kong Hospital Authority <a href="#ref-1" class="citation">[1]</a>. The team selected this source because it could support a working academic prototype without requiring access to private patient records. Historical records were cleaned and prepared for the XGBoost waiting-time model.

### NHS Research and Ideal Future Integration

During the proposal stage, the team investigated NHS England and the Waiting List Minimum Data Set (WLMDS). This research was valuable because it showed how an established healthcare system organizes waiting-list information and how CarePath Navigator could eventually connect to an authorized live source <a href="#ref-2" class="citation">[2]</a>.

The relevant NHS API is restricted and was not used in the final model. For this reason, the project diagrams treat an NHS-style hospital API as part of the ideal future architecture rather than a completed integration.

---

## 5. Data Science – Predicting Wait Times

### 5.1 Preprocessing

The Hong Kong waiting-time data was prepared for predictive modelling by handling missing values, removing duplicate entries, and standardizing hospital names. Time-based features included hour of day, day of week, weekday or weekend status, and other indicators associated with hospital congestion. Historical features such as previous waiting time and rolling averages were also considered. Categorical variables such as hospital or department were encoded into a machine-readable format.

### 5.2 Data Techniques 

The final system used an XGBoost supervised regression model. The model used temporal and historical queue information, including:
* Current waiting time
* Previous waiting times
* Rolling average queue duration
* Time of day / Day of week
* Hospital congestion level
* Hospital-specific patterns
The model was evaluated on held-out data using MAE, RMSE, and R². The final results were an MAE of 5.93 minutes, an RMSE of 8.42 minutes, and an R² of 0.8105. Full context and limitations are provided on the [Results page]({{ '/posts/results/' | relative_url }}).

### 5.3 Data Visualization

The processed and predicted waiting-time data is presented through the hospital-comparison interface. Users can compare the fastest and closest options, view predicted waits and confidence information, and continue to navigation. A continuously updating live map remains part of the future system.

---

## 6. Existing Research - Applications/Prototypes

To support the development of our hospital finder application, we reviewed existing apps and government data from 2025 to 2026 to understand current solutions and identify gaps.

### 6.1 Existing Applications

Platforms such as Zocdoc and Google Maps are useful for finding hospitals and booking appointments. However, they do not provide real-time information on hospital busyness, making it difficult for users to choose the fastest option in urgent situations. In addition, many apps are too complex, which can be challenging for users under stress.

### 6.2 Government Data

* The Hong Kong Hospital Authority provides public waiting-time information and supplied the basis for the final prototype dataset <a href="#ref-1" class="citation">[1]</a>.
* NHS England reporting was studied as a reference for a possible future authorized live-data integration <a href="#ref-2" class="citation">[2]</a>.
* Data from Japan's Ministry of Health, Labour and Welfare helped the team consider local healthcare access and future regional expansion <a href="#ref-3" class="citation">[3]</a>.

---

## 7. Risks and Privacy

### 7.1 Risks
**Incorrect Data**
Waiting time predictions may be inaccurate or outdated, especially during peak hours or emergencies. This can mislead patients and cause them to make poor decisions about where to go.

**Overcrowding Effect**
If many users identify the same hospital as having the shortest wait time,
they may all go there at once, leading to unexpected overcrowding. As a result, the system may unintentionally create longer waiting times.

**Inequality of Access**
Hospitals with better technology or digital infrastructure may attract more patients, while smaller or less-equipped hospitals may be overlooked. In addition, elderly patients or those who are not familiar with digital devices may be excluded from the benefits of the system.

### 7.2 Privacy
**Personal Health Data Leakage**
Sensitive information such as patients’ names, age, gender, ID, and medical conditions may be exposed if the system is not properly secured. This could lead to serious ethical and legal issues.

**Location Tracking**
The application may track users’ locations and hospital visits. If this data is misused or leaked, it could reveal personal behavior patterns or even health conditions.

**Lack of User Control**
Users may not fully understand what data is being collected or how it is used. Providing transparency and allowing users to control their data is important.

---

## 8. Sustainability

**Data Sustainability**
The web application must continuously maintain servers, APIs, and real-time data updates. This requires stable infrastructure and long-term technical support.

**Hospital Integration**
The system depends on cooperation from hospitals. However, not all hospitals are willing or able to share data, and their systems may not be compatible.

---

## References

<span id="ref-1">[1]</span> Hong Kong Hospital Authority. (2026). Accident and emergency waiting time data. Retrieved from [https://www.ha.org.hk](https://www.ha.org.hk){: .reference-link}

<span id="ref-2">[2]</span> NHS England. (2026). A&E waiting time statistics. Retrieved from [https://www.england.nhs.uk](https://www.england.nhs.uk){: .reference-link}

<span id="ref-3">[3]</span> Ministry of Health, Labour and Welfare. (2026). Healthcare system survey. Retrieved from [https://www.mhlw.go.jp](https://www.mhlw.go.jp){: .reference-link}

<span id="ref-4">[4]</span> Limiri, D. (2025). The impact of long wait times on patient health outcomes: The growing NHS crisis. Premier Journal of Public Health. [https://doi.org/10.70389/PJPH.100020](https://doi.org/10.70389/PJPH.100020){: .reference-link}

<span id="ref-5">[5]</span> Yaduvanshi, D., Sharma, A., & More, P. V. (2019). Application of queuing theory to optimize waiting time in hospital operations. Operations and Supply Chain Management, 12(3), 165–174. [https://doi.org/10.31387/oscm0380240](https://doi.org/10.31387/oscm0380240){: .reference-link}

<span id="ref-6">[6]</span> Moore, M. D. (2022). Waiting for the doctor: Managing time and emotion in the British National Health Service, 1948–80. Twentieth Century British History, 33(2), 203–229. [https://doi.org/10.1093/tcbh/hwab040](https://doi.org/10.1093/tcbh/hwab040){: .reference-link}

<span id="ref-7">[7]</span> Dong, J., Yom-Tov, E., & Yom-Tov, G. B. (2018). The impact of delay announcements on hospital network coordination and waiting times. Management Science. [https://doi.org/10.1287/mnsc.2018.3048](https://doi.org/10.1287/mnsc.2018.3048){: .reference-link}

<span id="ref-8">[8]</span> Perdana, R. H. Y., et al. (2019). Hospital queue control system using QR code as verification of patient’s arrival. International Journal of Advanced Computer Science and Applications, 10(8). [https://doi.org/10.14569/ijacsa.2019.0100847](https://doi.org/10.14569/ijacsa.2019.0100847){: .reference-link}

<span id="ref-9">[9]</span> Li, X., et al. (2022). Using artificial intelligence to reduce queuing time and improve satisfaction in pediatric outpatient service: A randomized clinical trial. Frontiers in Pediatrics, 10. [https://doi.org/10.3389/fped.2022.929834](https://doi.org/10.3389/fped.2022.929834){: .reference-link}
