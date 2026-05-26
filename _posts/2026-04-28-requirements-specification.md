---
layout: default
title: "Requirements Specification"
date: 2026-04-28
permalink: /posts/requirements-specification/
---

## Requirements Specification

## 1. Preface

### 1.1 Document Header

| Attribute | Value |
| --------- | ----- |
| **Document Title** | Software Requirements Specification (SRS) |
| **Project Name** | SmartCare Navigator |
| **Document Version** | 1.1.0 |
| **Status** | Final |


### 1.2 Version History

| Version | Date | Description | Rationale |
| ------- | ---- | ----------- | --------- |
| 1.0.0 | 2025-05-20 | Initial Draft | Baseline requirements for platform development. |
| 1.1.0 | 2025-05-24 | Revised Final | Integration of NHS WLMDS constraints and technical architectural depth. |


### 1.3 Intended Readership

In accordance with standard systems engineering practices, this document is designed for the following stakeholders:
* **System Customers**: Utilize this document to specify the requirements and read them to check that they meeth their actual needs. They also use it to specify changes to the requirements.
* **Managers**: Use the requirements document to plan a bid for the system and to plan the overall system development process.
* **System Engineers**: Use the requirements to understand what system is to be developed.
* **System Test Engineers**: Use the requirements to develop validation tests for the system.
* **System Maintainance Engineers**: Use the requirements to understand the system and the relationships between its parts to assess the impact of future modifications.

---

## 2. Introduction

### 2.1 System Purpose

SmartCare Navigator is a digital platform designed to provide real-time and predicted hospital waiting times across the United Kingdom. The system centralizes fragmented healthcare data to assist patients in locating facilities efficiently.
**Scope Note**: The system is exclusively for mild healthcare needs and clinic-level visits. It does not provide medical diagnoses or handle emergency cases.

### 2.2 Vision and Goals

The vision is to create an intuitive, accessible platform that reduces patient anxiety and support informed decision-making.
* **Transparency**: Provide clear, updated data from official NHS sources and regional trusts.
* **Empowerment**: Enable patients to compare waiting times and track their position on lists.
* **Data Accuracy**: Ensure public confidence by utilizing direct data from NHS England and NHS Digital.
* **Inclusivity**: Prioritize WCAG 2.1 AA compliance to support diverse digital literacy levels.

### 2.3 Problem Statement

UK healthcare facilities face systemic overcrowding while patients lack access to reliable and transparent information regarding waiting times, facility capabilities, specialist availability, and healthcare accessibility. Most patients choose healthcare facilities based on proximity, familiarity, or recommendations rather than selecting the facility most appropriate for their medical needs. This behavior contributes to overloaded hospitals, underutilized clinics, and inefficient patient distribution throughout the healthcare system.

Expert interviews conducted with healthcare professionals revealed that many patients experience difficulty navigating healthcare systems, understanding expected waiting times, and identifying appropriate healthcare providers. International patients face additional challenges due to language barriers and unfamiliarity with local healthcare services. Furthermore, waiting times are influenced by multiple operational factors including staffing availability, emergency cases, registration procedures, and diagnostic bottlenecks, making transparent communication essential for maintaining patient trust and satisfaction.

Existing map and healthcare applications provide limited visibility into these factors and often fail to deliver accurate and understandable waiting-time information. Therefore, a system is required that improves healthcare accessibility, supports informed patient decision-making, reduces uncertainty, and balances patient flow through real-time data, historical trends, and intelligent facility recommendations.

---

## 3. Glossary

### 3.1 Terminology Definitions

| Term | Definition |
|------|------------|
| **Visit Intent** | User-indicated care type (e.g., minor injury, specialty) used to refine recommendations and balance loads. |
| **Overcrowding Effect** | A surge in wait times caused when a recommendation system directs excessive traffic to a single "least busy" facility. |
| **WLMDS** | Waiting List Minimum Data Set; a national database of NHS patient waiting list details. |
| **Wait-Time Categorization** | The system must distinguish between the three wait-time types below in the UI to prevent user confusion. |

### 3.2 Waiting Time Categorization

* **A&E (Accident & Emergency) Wait Time**: Time from arrival at Accident & Emergency to being seen by medical staff.
* **Clinic Queue Time**: Real-time wait for walk-in or clinic-level consultations.
* **Appointment Availability**: The timeline for schedules specialist consultations (not real-time).

### 3.3 Technical Terms

* **WCAG (Web Content Accessibility Guidelines) 2.1 AA**: International accessibility standard for perceivable and robust digit content

* **Differential Privacy**: A technique to obfuscate exact GPS coordinates while allowing for nearest-facility calculations.

* **Probablistic Load Balancing**: An algorithm that adjusts recommendation weights to distrubute user traffic across the network.

---

## 4. User Requirements Definition

1. The system shall allow users to search for healthcare facilities by medical specialty, including pediatrics and minor injuries.
2. The system shall provide support for multiple languages to assist international users.
3. The system shall display whether hospitals accept insurance providers as defined in the System Data Dictionary (sourced from the WLMDS API).
4. The system shall identify healthcare facilities based on the user's location while applying differential privacy filters.
5. The system should allow users to toggle preferences between "fastest service" and "closest distance."
6. The system shall allow for anonymous crowdsourced wait-time updates.
7. The system should provide visit preparation guidance, specifically required documentation checklists and clinic-specific arrival instructions.
8. The system shall explicitly label wait times as "A&E," "Clinic," or "Appointment" to ensure clarity of intent.
9. The system shall display supported languages for each healthcare facility.
10. The system shall classify language support as:
    * Fully Bilingual Staff
    * Basic Communication Available
    * Translation Service Available
    * No Verified Language Support

11. The system shall display the date on which language support information was last verified.
12. The system shall display the source and timestamp of all waiting-time estimates.
13. The system shall classify healthcare facilities according to capability level:
    * Clinic
    * General Hospital
    * Emergency Hospital
    * Specialty Center

14. The system shall provide emergency contact information and guidance for urgent situations.

---

## 5. System Architecture

### 5.1 High-Level Overview & Interoperability

The architecture utilizes a distributed function mode. To maintain real-time accuracy, the system shall implement a 15-minute polling cycle, mirroring the Hong Kong Hospital Authority logic, to fetch updates from regional trust APIs and the nation WLMDS.

### 5.2 System Constraints

* **API Restriction**: The NHS WLMDS API is cureently for internal NHS use only. Integration is contingent upon the pending approval from NHS England for academic usage.
* **Data Integrity**: Predictions are dependent on the reporting frequency of individual trusts.

### 5.3 Data Acquisition Componenets

The system retrieves the following files from the WLMDS API:
* **Census Date**: Data snapshot timing.
* **Treatment Function Code**: Care pathway identification.
* **Organization ID**: Unique trust/provider identifier.
* **Patient Waiting Start Date**: Used for historical lag-based duration calculations.

---

## 6. Functional Requirements

### FR-1 Hospital Recommendation Function

The system should recommend suitable hospitals based on the user's current situation and hospital congestion.

**System Requirements**

**FR-1.1** The system shall get the user’s approximate location through mobile GPS data.

**FR-1.2** The system shall allow users to specify their visit intent and priority preference (e.g., shortest waiting time or nearest distance).

**FR-1.3** The system shall rank hospitals based on:
* Predicted waiting time
* Distance from the user
* Current congestion level

**FR-1.4** The system should display multiple alternative hospital options.

**FR-1.5** The system shall provide a recommendation rationale for each hospital.

**FR-1.6** The system shall prioritize specialty compatibility when generating recommendations.

**FR-1.7** The system shall consider language support when ranking healthcare facilities.

**FR-1.8** The system shall display facility capability classifications alongside recommendations.

**FR-1.9** The system shall provide explanation details for recommendation decisions including waiting time, distance, specialty match, and language support availability.


### FR-2 Overcrowding Prevention Function

The system shall reduce recommendation bias toward already crowded facilities.

**System Requirements**

**FR-2.1** The system shall monitor concurrent visit intent volume for each hospital.

**FR-2.2** The system shall dynamically adjust recommendation rankings when congestion exceeds a predefined threshold.

**FR-2.3** The system shall distribute recommendations across multiple nearby facilities when necessary.

**FR-2.4** The system shall continue providing alternative recommendations even during high-demand periods.


### FR-3 Wait-Time Prediction Function

The system shall estimate future waiting times using historical and real-time information.

**System Requirements**

**FR-3.1** The system shall collect:
* Historical queue data
* Temporal information
* Real-time crowdsourced updates

**FR-3.2** The system shall predict estimated waiting times for each hospital.

**FR-3.3** The system shall periodically update predictions when new data becomes available.


### FR-4 Confidence and Reliability Visualization Function

The system shall communciate prediction uncertainty  to users

**System Requirements**

**FR-4.1** The system shall present predicted waiting times as a range rather than a single fixed value.

**FR-4.2** The system should display a confidence score for each prediction.

**FR-4.3** The system shall calculate reliability using:
* Model accuracy metrics
* Data recency

**FR-4.4** The system shall visually indicate low-confidence predictions.


### FR-5 User Preference Management Function

The system shall personalize recommendations according to user preferences.

**System Requirements**

**FR-5.1** The system shall allow users to select recommendation priorities.

**FR-5.2** The system shall store user preference settings locally or securely in the cloud.

**FR-5.3** The system shall apply saved preferences during recommendation generation.


### FR-6 Real-Time Data Update Function

The system shall continuously update recommendation data.

**System Requirements**
**FR-6.1** The system shall retrieve updated facility information at regular intervals.

**FR-6.2** The system shall refresh prediction results when significant queue changes occur.

**FR-6.3** The system shall notify users when recommendation conditions change significantly.


### FR-7 Language Support Verification Function

The system shall assist international patients and visitors in location healcare facilities capable of communicating in their preferred language.

**System Requirements**

**FR-7.1** The system shall display supported languages for each healthcare facility.

**FR-7.2** The system shall classify language support according to predefined support levels.

**FR-7.3** The system shall periodically verify language support information through facility updates.

**FR-7.4** The system shall display the date of the most recent language support verification.

**FR-7.5** The system shall notify administrators when language support information requires revalidation.


### FR-8 Emergency Guidance Function

The system shall reduce inappropriate usage during medical emergencies.

**System Requirements**

**FR-8.1** The system shall clearly state that SmartCare Navigator is not a diagnostic tool.

**FR-8.2** The system shall provide emergency contact information.

**FR-8.3** The system shall display emergency guidance messages throughout the application.

**FR-8.4** The system shall direct users toward emergency services when severe symptoms are reported.

**FR-8.5** The system shall distinguish between emergency facilities and non-emergency facilities in recommendation results.

---

## 7. Non-Functional Requirements

### NFR-1 Performance Requirements

They system shall maintain fast, responsive, and accurate performance under normal and peak usage conditions.

**System Requirements**

**NFR-1.1** The system shall display search results within 3 seconds under normal network conditions.

**NFR-1.2** Real-time waiting time data shall be updated at intervals no greater than 5 minutes.

**NFR-1.3** Queue predictions shall be calculated and displayed within 2 seconds of user input.

**NFR-1.4** The application shall maintain responsive performance with up to 10,000 concurrent users.


### NFR-2 Usability Requirements

The system shall provide an accessible, user-friendly, and multilingual experience for all users.

**System Requirements**

**NFR-2.1** The application shall comply with WCAG 2.1 Level AA accessibility standards.

**NFR-2.2** All interactive elements shall be keyboard-navigable and screen-reader compatible.

**NFR-2.3** The application shall support Japanese, English, Filipino, Chinese, and Korean languages.

**NFR-2.4** Users shall be able to filter search results by preferred language support.


### NFR-3 Reliability and Availability

The system shall ensure consistent availability, dependable operation, and accurate healthcare information.

**System Requirements**

**NFR-3.1** The system shall maintain 99.5% uptime during operational hours.

**NFR-3.2** In case of data source failure, the system shall fall back to cached historical data.

**NFR-3.3** Healthcare facility information shall be verified against official sources at least monthly.


### NFR-4 Security and Privacy Requirements

The system shall protect user data and ensure secure handling of sensitive information.

**System Requirements**

**NFR-4.1** User location data shall be anonymized and shall not be stored longer than 24 hours.

**NFR-4.2** The application shall support anonymous usage without requiring user registration.

**NFR-4.3** All data transmission shall use TLS 1.3 or higher encryption.

**NFR-4.4** The system shall implement rate limiting to prevent abuse and DDoS attacks.


### NFR-5 Safety and Liability Requirements

The system shall promote safe usage and clearly communicate the limitations of the application.

**System Requirements**

**NFR-5.1** The application shall clearly state that it is not a diagnostic tool.

**NFR-5.2** Emergency contact information shall be displayed prominently.

**NFR-5.3** The system shall not provide medical diagnoses or medical advice under any circumstances.


### NFR-6 Compatibility and Portability

The system shall operate reliably across supported devices, platforms, and network conditions.

**System Requirements**

**NFR-6.1** The application shall support iOS 14+ and Android 9+ devices.

**NFR-6.2** The web-based version shall support modern browsers including Chrome, Firefox, Safari, and Edge.

**NFR-6.3** The application shall provide limited offline functionality when network connectivity is unavailable.


### NFR-7 Scalability Requirements

The system shall support future growth in users, data volume, and system demand.

**System Requirements**

**NFR-7.1** The system architecture shall support horizontal scaling for up to 100,000 daily active users.

**NFR-7.2** The database shall support storage of historical wait-time data for at least 500 healthcare facilities.


### NFR-8 Maintainability Requirements

The system shall support efficient maintenance, monitoring, and future updates.

**System Requirements**

**NFR-8.1** The system shall use a modular architecture to support independent component updates.

**NFR-8.2** All code shall follow project documentation standards with clear API specifications.

**NFR-8.3** The system shall log errors, failures, and performance anomalies for troubleshooting.


### NFR-9 Compliance and Standards

The sysstem shall comply with applicable legal, privacy, and healthcare information standards.

**System Requirements**

**NFR-9.1** The application shall comply with Japan’s Act on the Protection of Personal Information (APPI).

**NFR-9.2** The system shall comply with GDPR requirements for international users where applicable.


### NFR-10 Trust and Transparency Requirements

The system shall provide transparent, verifiable, and trustworthy healthcare information.

**System Requirements**

**NFR-10.1** All healthcare facility information shall be traceable to official sources.

**NFR-10.2** The system shall clearly distinguish verified data, user-generated content, and predictive estimates.

**NFR-10.3** Users shall be able to report incorrect information for review.


### NFR-11 Future Extensibilty Requirements

The system shall support future enhancements and integration with additional healthcare services.

**System Requirements**

**NFR-11.1** The system architecture shall support future symptom-to-facility matching features.

**NFR-11.2** The API design shall support future integration with third-party healthcare platforms.

---

## 8. Organizational Requirements

**Acadmeic & Legal Compliance**: The development and deployment of the platform must fully comply with NHS England's terms and conditions for academic usage, especially regarding the pending approval for the WLMDS API.

**Collaboration & Version Control**: The development team shall use Git and GitHub for version control to ensure smooth collaboration. All code changes must be reviewed and merged according to the team's internal rules before major updates.

**Agile Documentation**: To keep track of the project direction, the project documentation - including this SRS - must be updated and reviewed weekly by the documentation lead after every team meeting.

---

## 9. System Evolution

* **API Adaptation**: The system shall adapt to evolving NHS reporting standards, specifically incorporating the "4-hour waiting target" statistics from NHS England 2026 report.

* **Regional Expansion**: Future iterations will seek to integrate direct real-time telemetry from individual trust-level patient flow systems.

* **Future Symptom Guidance**: Future version may include symptom-to-facility guidance functionality that assists users in identifying the appropriate level of care. This functionality shall provide informational guidance only and shall not perform medical diagnosis.

---

## 10. Validation Criteria

### 10.1 Validation Checklist

| Criteria | Description |
|----------|-------------|
| **Validity** | Does the system provide functions supporting the mild-healthcare scope? |
| **Consistency** | Do requirements for privacy conflict with location-based recommendations? |
| **Completeness** | Are all core features (Specialty search, load balancing) present? |
| **Realism** | Can it be built given the WLMDS API internal-use constraints? |
| **Verifiability** | Can these be checked through quantitative objective testing? |

### 10.2 Verification Commands for Test Engineers

* **Load Balancing**: "Simulate 1,000 concurrent user requests for Facility A and verify that Facility A's recommendation rank drops by at least 30% to trigger redistribution to other facilities."

* **Accuracy**: "Compare the system's predicted wait times with the actual wait times reported by the 20 facilities for the past 30 days, calculating the Mean Absolute Error (MAE) and ensuring it remains within ±15% of the actual wait times."

* **Confidence Scores**: "Simulate a data pull failure from the WLMDS API and verify that the UI widens the wait-time range by 50% and lowers the confidence score to 'Low'."

* **Privacy**: "Attempt to retrieve exact GPS coordinates from the application log and verify that coordinates are obfuscated to a 500-meter radius."

---

## 11. Appendices

### 11.1 Data Preprocessing Steps

* **Cleaning**: Handling null values in the Patient Waiting Start Date field.
* **Standardization**: Mapping inconsistent trust naming conventions to the Organization ID
* **Encoding**: Transforming categorical variables (hospital type/department) for model ingestion.

### 11.2 Predictive Features List

* **Temporal Features**: Hour of dat, Day of week, Weekend/Weekday indicators, and Holiday indicators.
* **Historical Features**: Rolling average queue duration (1h, 3h, 6h intervals) and lag-based previous recorded wait times.
* **Trend Features**: Facility-specific congestion gradients over the last 60 minutes.

---

## 12. Expert Interview Findings

### 12.1 Expert Profile: Dr. Vito LaRocca, MD, MPH

