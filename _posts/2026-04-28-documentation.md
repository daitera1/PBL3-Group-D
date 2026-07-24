---
layout: default
title: "Documentation"
date: 2026-04-28
permalink: /posts/documentation/
---

This page records Group D's progress from project selection through final testing and presentation preparation. It is based on the team's meeting notes, weekly reports, project documents, and completed deliverables.

---

## Week 1 - Project Initiation

### Group Focus

The team began by researching smart-city problems that could support a realistic software prototype. Our early ideas included a heat-risk map, accessible travel routes, electric-vehicle data transparency, and a hospital navigation and queue-prediction system.

### Work Completed

- Selected Jacob Smith as Project Manager.
- Assigned the first documentation and website responsibilities.
- Reviewed research through Google Scholar and other academic sources.
- Compared the feasibility, available data, and likely social impact of each idea.
- Agreed that healthcare accessibility was the strongest overall direction for the group.

### Next Step

Narrow the healthcare idea into a specific problem that could be developed and evaluated within the semester.

---

## Week 2 - CarePath Concept Selection

### Group Focus

The team selected a smart hospital finder as the main project. The proposed system would compare hospitals using waiting time, location, specialty, language support, and other practical information.

### Work Completed

- Defined the initial CarePath Navigator concept.
- Discussed historical data and crowdsourced updates as alternatives when live data is unavailable.
- Investigated public datasets from Hong Kong and several European countries.
- Identified the Hong Kong Hospital Authority dataset as a promising source.
- Began planning user interviews and a survey about hospital waiting experiences.

### Next Step

Choose the main data source and determine whether an authorized live hospital API could be used.

---

## Week 3 - Proposal and Data Investigation

### Group Focus

The team organized the project proposal and created the shared GitHub website. During the data investigation, we found an NHS source that demonstrated the kind of live integration we wanted, but its API access was restricted.

### Work Completed

- Divided the project proposal into sections and assigned work based on member strengths.
- Created the GitHub repository and coordinated contributions to the proposal.
- Contacted the NHS to request educational access to its restricted API.
- Considered manual collection and public historical datasets as fallback options.
- Expanded the research scope beyond emergency rooms to include hospitals, clinics, and related healthcare services.

### Decision

The NHS system would remain an example of the ideal future integration. The team continued evaluating public data that could support the class prototype without restricted access.

---

## Week 4 - Proposal Submission and Early Validation

### Group Focus

The proposal and first project website were submitted. The team then moved into requirements research and early validation of the problem.

### Work Completed

- Submitted the project proposal and published the first website version.
- Held a group meeting during Golden Week to assign requirements roles.
- Conducted three early user interviews about recent hospital visits and waiting times.
- Interviewed a nurse familiar with hospital waiting-room operations.
- Confirmed that people often do not know how busy a hospital is before arriving.
- Began turning interview observations into questions for a larger survey.

### Next Step

Develop the requirements specification using survey findings, expert feedback, and research.

---

## Week 5 - Requirements and Research Preparation

### Group Focus

The group organized the structure of the Software Requirements Specification and prepared the research material needed for the midterm stage.

### Work Completed

- Assigned functional and non-functional requirements across the team.
- Developed and distributed the user survey.
- Continued outreach to healthcare professionals for expert interviews.
- Organized early findings about waiting times, accessibility, language support, and hospital information.
- Prepared the midterm slide template and agreed to keep the presentation design simple.

### Next Step

Complete the survey analysis, expert interviews, requirements document, and midterm presentation.

---

## Week 6 - Requirements Finalization and Midterm Preparation

### Group Focus

The team combined research findings with the system requirements and prepared for the midterm presentation.

### Work Completed

- Reviewed responses from the 89-person survey.
- Conducted healthcare-professional interviews and incorporated their feedback.
- Completed major sections of the functional and non-functional requirements.
- Organized two team meetings to combine and review each member's work.
- Assigned presentation slides and prepared a presentation script.
- Practiced the presentation to remain within the seven-minute limit and prepared for questions.

### Research Outcome

The survey and interviews supported the need for clearer waiting-time information, understandable confidence ranges, and better access to hospital information.

---

## Week 7 - Midterm Presentation and Design Transition

### Group Focus

The team delivered the midterm presentation and used the professors' feedback to move from requirements into system modelling.

### Work Completed

- Practiced before class and delivered the midterm presentation.
- Received feedback that the presentation should emphasize functional requirements before UI details.
- Assigned UML diagrams and implementation preparation tasks.
- Began the State and Sequence Diagrams.
- Continued dataset collection and website work.
- Confirmed that proposed architecture diagrams could show an authorized hospital API as the ideal system, even though the final prototype would use accessible data.

### Next Step

Complete the first UML drafts and review them against the requirements.

---

## Week 8 - UML Development

### Group Focus

All members contributed to system modelling. The team checked that each diagram described the same CarePath Navigator workflow and features.

### Diagram Responsibilities

- **Mahiro Ueda:** Class Diagram
- **Bien Alolod:** Use Case and Activity Diagrams
- **Jacob Smith:** State and Sequence Diagrams
- **Ibuki Yasuda:** Components Diagram
- **Other members:** implementation research, website support, and diagram review

### Work Completed

- Completed and peer-reviewed the State Diagram.
- Produced the first Sequence Diagram draft.
- Compared the UML work with software-engineering course examples.
- Discussed how hospital recommendations, predicted waits, reviews, and confidence information should appear in the system.
- Began connecting the diagrams to the planned system architecture.

---

## Week 9 - Design Review and Architecture Planning

### Group Focus

The team refined the diagrams and began translating the system design into an implementable architecture.

### Work Completed

- Finalized the Sequence Diagram and added website descriptions.
- Reviewed the Use Case, State, Class, Component, and other diagrams for consistency.
- Checked that recommendations, waiting-time prediction, navigation, and reviews were represented across the design.
- Produced the first system-architecture draft.
- Planned the use of historical data and a held-out training and evaluation split.
- Divided the remaining work between architecture, data preparation, model development, and prototype implementation.

### Next Step

Finish the system-design documentation and begin model and interface implementation.

---

## Week 10 - Architecture and Implementation Planning

### Group Focus

The team completed the main design phase and began coordinating implementation.

### Work Completed

- Held a Sunday progress meeting and a separate architecture meeting.
- Reviewed the relationships between the frontend, backend, database, prediction model, language support, reviews, and hospital information.
- Continued the system-architecture and component planning.
- Checked the implementation team's progress on data preparation and prediction modelling.
- Confirmed Hong Kong public-hospital data as the final model-development source.
- Kept the NHS API in the proposed architecture only as an example of a future authorized live-data connection.

---

## Week 11 - First Integrated Prototype

### Group Focus

The team moved into prototype development while continuing to update the architecture and presentation materials.

### Work Completed

- Completed the first frontend mock-up.
- Refined the Components Diagram and reviewed how the frontend, backend, database, and prediction model connect.
- Continued work on the Pipe-and-Filter Diagram and other architecture documents.
- Updated the presentation slides to match the latest design.
- Coordinated the next stage of backend and prediction-model integration.
- Reviewed the interface flow for hospital search, comparison, predicted waiting time, and navigation.

### Next Step

Connect the prepared data and prediction outputs to the prototype and test the complete user flow.

---

## Week 12 - Integration and Final Preparation

### Group Focus

The team tested the prototype and updated the documentation when implementation decisions changed the planned architecture.

### Work Completed

- Coordinated frontend, backend, database, and prediction-model tasks.
- Updated the system architecture to include a backend function identified during testing.
- Checked that the diagrams matched the system being demonstrated.
- Integrated hospital information and prediction outputs into the prototype flow.
- Prepared final slides covering the problem, features, architecture, results, and demonstration.
- Scheduled the final group review and assigned the remaining presentation and demo tasks.

---

## Week 13 - Final Testing and Presentation

### Group Focus

The final week focused on consistency, testing, and communicating the completed project clearly.

### Work Completed

- Reviewed the website, requirements, diagrams, architecture, and slides for consistency.
- Finalized the presentation with contributions from multiple team members.
- Replaced the original skit idea with a direct screen-recorded demonstration so the system features were easier to understand.
- Investigated unexpectedly strong model results and corrected how the evaluation metrics were being read.
- Confirmed the final XGBoost results: MAE 5.93 minutes, RMSE 8.42 minutes, and R² 0.8105.
- Clarified that the final evaluation used Hong Kong data while NHS integration remained a future ideal direction.
- Completed the final project demonstration and submission materials.

### Final Outcome

CarePath Navigator was completed as a hospital-comparison prototype supported by user research, expert interviews, system modelling, architecture documentation, and an evaluated waiting-time prediction model.

---
