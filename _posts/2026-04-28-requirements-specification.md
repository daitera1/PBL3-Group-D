---
layout: default
title: "Requirements Specification"
date: 2026-04-28
permalink: /posts/requirements-specification/
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
• <a href="#1-preface" class="toc-link"><strong>1. Preface</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#11-document-header" class="toc-link">1.1 Document Header</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#12-version-history" class="toc-link">1.2 Version History</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#13-intended-readership" class="toc-link">1.3 Intended Readership</a></span><br>
• <a href="#2-introduction" class="toc-link"><strong>2. Introduction</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#21-system-purpose" class="toc-link">2.1 System Purpose</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#22-vision-and-goals" class="toc-link">2.2 Vision and Goals</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#23-problem-statement" class="toc-link">2.3 Problem Statement</a></span><br>
• <a href="#3-glossary" class="toc-link"><strong>3. Glossary</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#31-terminology-definitions" class="toc-link">3.1 Terminology Definitions</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#32-waiting-time-categorization" class="toc-link">3.2 Waiting Time Categorization</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#33-technical-terms" class="toc-link">3.3 Technical Terms</a></span><br>
• <a href="#4-user-requirements-definition" class="toc-link"><strong>4. User Requirements Definition</strong></a><br>
• <a href="#5-functional-requirements" class="toc-link"><strong>5. Functional Requirements</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#fr-1-hospital-recommendation-function" class="toc-link">FR-1 Hospital Recommendation Function</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#fr-2-overcrowding-prevention-function" class="toc-link">FR-2 Overcrowding Prevention Function</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#fr-3-wait-time-prediction-function" class="toc-link">FR-3 Wait-Time Prediction Function</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#fr-4-confidence-and-reliability-visualization-function" class="toc-link">FR-4 Confidence and Reliability Visualization Function</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#fr-5-user-preference-management-function" class="toc-link">FR-5 User Preference Management Function</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#fr-6-real-time-data-update-function" class="toc-link">FR-6 Real-Time Data Update Function</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#fr-7-language-support-verification-function" class="toc-link">FR-7 Language Support Verification Function</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#fr-8-emergency-guidance-function" class="toc-link">FR-8 Emergency Guidance Function</a></span><br>
• <a href="#6-non-functional-requirements" class="toc-link"><strong>6. Non-Functional Requirements</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#nfr-1-performance-requirements" class="toc-link">NFR-1 Performance Requirements</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#nfr-2-usability-requirements" class="toc-link">NFR-2 Usability Requirements</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#nfr-3-reliability-and-availability" class="toc-link">NFR-3 Reliability and Availability</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#nfr-4-security-and-privacy-requirements" class="toc-link">NFR-4 Security and Privacy Requirements</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#nfr-5-safety-and-liability-requirements" class="toc-link">NFR-5 Safety and Liability Requirements</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#nfr-6-compatibility-and-portability" class="toc-link">NFR-6 Compatibility and Portability</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#nfr-7-scalability-requirements" class="toc-link">NFR-7 Scalability Requirements</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#nfr-8-maintainability-requirements" class="toc-link">NFR-8 Maintainability Requirements</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#nfr-9-compliance-and-standards" class="toc-link">NFR-9 Compliance and Standards</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#nfr-10-trust-and-transparency-requirements" class="toc-link">NFR-10 Trust and Transparency Requirements</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#nfr-11-future-extensibilty-requirements" class="toc-link">NFR-11 Future Extensibilty Requirements</a></span><br>
• <a href="#7-organizational-requirements" class="toc-link"><strong>7. Organizational Requirements</strong></a><br>
• <a href="#8-system-evolution" class="toc-link"><strong>8. System Evolution</strong></a><br>
• <a href="#9-validation-criteria" class="toc-link"><strong>9. Validation Criteria</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#91-validation-checklist" class="toc-link">9.1 Validation Checklist</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#92-verification-commands-for-test-engineers" class="toc-link">9.2 Verification Commands for Test Engineers</a></span><br>
• <a href="#10-appendices" class="toc-link"><strong>10. Appendices</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#101-data-preprocessing-steps" class="toc-link">10.1 Data Preprocessing Steps</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#102-predictive-features-list" class="toc-link">10.2 Predictive Features List</a></span><br>
• <a href="#11-expert-interview-findings" class="toc-link"><strong>11. Expert Interview Findings</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#111-expert-profile-dr-vito-larocca-md-mph" class="toc-link">11.1 Expert Profile: Dr. Vito LaRocca, MD, MPH</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#112-expert-profile-charlene-diloffi" class="toc-link">11.2 Expert Profile: Charlene DiLoffi</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#113-impact-on-carepath-navigator" class="toc-link">11.3 Impact on CarePath Navigator</a></span><br>
• <a href="#12-user-survey-findings" class="toc-link"><strong>12. User Survey Findings</strong></a><br>
<span style="margin-left: 1.8em;">○ <a href="#121-key-challenges-identified" class="toc-link">12.1 Key Challenges Identified</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#122-feature-evaluation-results" class="toc-link">12.2 Feature Evaluation Results</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#123-most-requested-features" class="toc-link">12.3 Most Requested Features</a></span><br>
<span style="margin-left: 1.8em;">○ <a href="#124-impact-on-carepath-navigator" class="toc-link">12.4 Impact on CarePath Navigator</a></span>
</div>

</div>
</details>
</div>

---

## 1. Preface

### 1.1 Document Header

| Attribute | Value |
| --------- | ----- |
| **Document Title** | Software Requirements Specification (SRS) |
| **Project Name** | CarePath Navigator |
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

CarePath Navigator is a digital platform designed to provide real-time and predicted hospital waiting times across the United Kingdom. The system centralizes fragmented healthcare data to assist patients in locating facilities efficiently.

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

## 5. Functional Requirements

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

The system shall communicate prediction uncertainty to users.

**System Requirements**

**FR-4.1** The system shall present predicted waiting times as a range rather than a single fixed value.

**FR-4.2** The system shall display a confidence score for each prediction.

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

**FR-8.1** The system shall clearly state that CarePath Navigator is not a diagnostic tool.

**FR-8.2** The system shall provide emergency contact information.

**FR-8.3** The system shall display emergency guidance messages throughout the application.

**FR-8.4** The system shall direct users toward emergency services when severe symptoms are reported.

**FR-8.5** The system shall distinguish between emergency facilities and non-emergency facilities in recommendation results.

---

## 6. Non-Functional Requirements

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

## 7. Organizational Requirements

* **Academic & Legal Compliance**: The development and deployment of the platform must fully comply with NHS England's terms and conditions for academic usage, especially regarding the pending approval for the WLMDS API.

* **Collaboration & Version Control**: The development team shall use Git and GitHub for version control to ensure smooth collaboration. All code changes must be reviewed and merged according to the team's internal rules before major updates.

* **Agile Documentation**: To keep track of the project direction, the project documentation - including this SRS - must be updated and reviewed weekly by the documentation lead after every team meeting.

---

## 8. System Evolution

* **API Adaptation**: The system shall adapt to evolving NHS reporting standards, specifically incorporating the "4-hour waiting target" statistics from NHS England 2026 report.

* **Regional Expansion**: Future iterations will seek to integrate direct real-time telemetry from individual trust-level patient flow systems.

* **Future Symptom Guidance**: Future version may include symptom-to-facility guidance functionality that assists users in identifying the appropriate level of care. This functionality shall provide informational guidance only and shall not perform medical diagnosis.

---

## 9. Validation Criteria

### 9.1 Validation Checklist

| Criteria | Description |
|----------|-------------|
| **Validity** | Does the system provide functions supporting the mild-healthcare scope? |
| **Consistency** | Do requirements for privacy conflict with location-based recommendations? |
| **Completeness** | Are all core features (Specialty search, load balancing) present? |
| **Realism** | Can it be built given the WLMDS API internal-use constraints? |
| **Verifiability** | Can these be checked through quantitative objective testing? |

### 9.2 Verification Commands for Test Engineers

* **Load Balancing**: "Simulate 1,000 concurrent user requests for Facility A and verify that Facility A's recommendation rank drops by at least 30% to trigger redistribution to other facilities."

* **Accuracy**: "Compare the system's predicted wait times with the actual wait times reported by the 20 facilities for the past 30 days, calculating the Mean Absolute Error (MAE) and ensuring it remains within ±15% of the actual wait times."

* **Confidence Scores**: "Simulate a data pull failure from the WLMDS API and verify that the UI widens the wait-time range by 50% and lowers the confidence score to 'Low'."

* **Privacy**: "Attempt to retrieve exact GPS coordinates from the application log and verify that coordinates are obfuscated to a 500-meter radius."

---

## 10. Appendices

### 10.1 Data Preprocessing Steps

* **Cleaning**: Handling null values in the Patient Waiting Start Date field.
* **Standardization**: Mapping inconsistent trust naming conventions to the Organization ID
* **Encoding**: Transforming categorical variables (hospital type/department) for model ingestion.

### 10.2 Predictive Features List

* **Temporal Features**: Hour of day, Day of week, **Weekend/Weekday indicators**, and Holiday indicators.
* **Historical Features**: **Rolling average queue duration** (1h, 3h, 6h intervals) and lag-based previous recorded wait times.
* **Trend Features**: Facility-specific congestion gradients over the last 60 minutes.

---

## 11. Expert Interview Findings

### 11.1 Expert Profile: Dr. Vito LaRocca, MD, MPH

**Division Chief of Ophthalmology, Connecticut Children's Hospital**

The project team conducted an expert interview with Dr. Vito LaRocca, MD, MPH, a board-certified ophthalmologist and healthcare leader with more than 20 years of clinical and academic experience. Dr. LaRocca currently serves as Division Chief of Ophthalmology at Connecticut Children's Hospital and previously held leadership positions at Boston Children's Hospital, Boston University, and Eye Health Services. In addition to his clinical experience, he holds a Master of Public Health (MPH) in Epidemiology and has extensive experience in healthcare research, medical device regulation, and healthcare program development.

**Key Findings**

* Patients often select facilities based on familiarity or convenience rather than suitability.
* Trust and reliability are critical factors in healthcare technology adoption.
* Inaccurate healthcare information reduces patient confidence.
* Patients prefer simple, understandable healthcare information.
* Many patients struggle to navigate healthcare systems.
* International patients face significant language-related barriers.
* Accessibility and transparency should be prioritized in healthcare applications.
Accurate specialist and facility information supports informed decisions.
Simplicity and usability are more valuable than unnecessary technical complexity.

---

### 11.2 Expert Profile: Charlene DiLoffi

**Manager of Waiting Room Operations, South Shore Hospital**

Charlene DiLoffi is a healthcare operations professional with over 20 years of experience in hospital administration and patient services. She currently serves as Manager of Waiting Room Operations at South Shore Hospital, where she oversees patient flow management, registration processes, scheduling coordination, and waiting room operations. Throughout her career, she has worked closely with physicians, nurses, and administrative staff to improve patient satisfaction and reduce operational bottlenecks.

**Key Findings**

* Waiting times are influenced by many operational factors beyond patient volume.
* Staffing shortages can significantly increase waiting times.
* Emergency cases frequently delay non-emergency patients.
* Diagnostic testing and specialist consultations create workflow bottlenecks.
* Administrative procedures contribute substantially to overall waiting times.
* Lack of communication increases patient frustration and anxiety.
* Mondays, mornings, holidays, and flu seasons produce higher patient demand.
* Many hospital visits could be redirected to clinics or urgent care facilities.
* Better pre-arrival guidance would improve patient distribution.
* Transparency regarding waiting times improves patient satisfaction.

---

### 11.3 Impact on CarePath Navigator

The expert interviews directly influenced several design decisions and requirements within CarePath Navigator.

Key improvements derived from the interviews include:
* Multilingual support for international patients.
* Healthcare facility specialization information.
* Transparent waiting-time estimates with confidence ranges.
* Data source and update-time visibility.
* Facility capability classifications.
* Improved recommendation algorithms considering suitability as well as proximity.
* Privacy-focused handling of healthcare-related information.
* Emergency guidance functionality.
* Future symptom-to-facility guidance features.

---

## 12. User Survey Findings

To better understand user needs and validate the proposed functionality of CarePath Navigator, the project team conducted a survey involving **89 participants** from diverse backgrounds, including Japanese, Filipino, American, and other nationalities.

The survey aimed to identify common challenges experienced during hospital visits and evaluate the perceived usefulness of potential CarePath Navigator features.

### 12.1 Key Challenges Identified

Participants reported several recurring frustrations when visiting healthcare facilities:
* Long waiting times
* Language barriers
* Difficulty finding the correct department

Notably, **83% of respondents reported experiencing long waiting times during hospital visits**, indicating that waiting-time management is a significant issue affecting patient satisfaction and healthcare accessibility.

The survey also highlighted the challenges faced by international patients, particularly regarding communication and navigation within healthcare facilities.

### 12.2 Feature Evaluation Results

Participants were asked to evaluate potential application features using a 5-point usefulness scale.

**Real-Time Waiting Time Information**

* **82% of respondents rated this features as useful (4 or 5 out of 5).**

This was the highest-rated feature in the survey, indicating strong demand for transparent and up-to-date waiting-time information.

**Language Support**

* **69% of respondents rated language support as useful**

Given the international composition of the participant group, this result highlights the importance of multilingual accessibility within healthcare systems.

**Hospital Reviews**

* **71% of respondents rated hospital reviews as useful.**

This suggests that users value community experiences and additional information when selecting healthcare facilities.

### 12.3 Most Requested Features

When participants were asked which features would be most useful in a hospital navigation application, the most common responses were:

1. Real-time waiting times
2. Queue prediction
3. Language support

These results align closely with findings from expert interviews and further validate the project's focus on improving transparency, accessibility, and healthcare navigation.

### 12.4 Impact on CarePath Navigator

The survey findings directly infuenced the system requirements and feature prioritization of CarePath Navigator.

Based on the survey results, the project team prioritized:

* Real-time waiting time monitoring
* Waiting-time prediction functionality
* Multilingual language support
* Improved hospital recommendation systems
* Clear healthcare facility information
* Enhanced accessibility for international patients

Overall, the survey demonstrates strong user demand for technologies that reduce uncertainty, improve communication, and simplify the healthcare experience.
