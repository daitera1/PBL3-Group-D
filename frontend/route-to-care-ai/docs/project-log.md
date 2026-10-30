---
layout: default
title: "Documentation"
date: 2026-04-28
permalink: /posts/documentation/
---

## Week 1

### **Summary of Discussion**

For week 1, we took note of using Google Scholar to look into research ideas that could realistically be done in the next five years with the application of smart cities, since technology will likely have moved forward by then. We're also doing weekly reports to share ideas, research papers, and what everyone's been working on individually, and we finished assigning roles for weeks 1-3.


### **Group Roles**

**Project Manager**: Jake
**Documentation Leads**: Bien, Ibuki, and Mahiro
**Website Coordinators**: Sadia, Daisuke, and Hanz
**Pending Coordinators (TBD)**: Presentation, Design, Developers, and Architecture Specialists will be designated as our system scope matures.


### **Brainstormed Ideas**:

### **1. Safe Heat Map (Climate & Vulnerable Group Protection)**

This concept leverages live weather updates and predictive mapping to shield vulnerable populations (such as the elderly or outdoor workers) from extreme weather events.

* **Core Technical Pillars**: Integration of real-time Weather APIs to track rising temperature indexes and pinpoint active urban heat islands.

* **Healthcare Integration**: Mapping physical locations of municipal cooling stations and cross-referencing them with localized healthcare readiness and clinic access points.


### **2. Hospital Navigation System (Smart Queue & Prediction Model)**

To maximize the real-world precision of our prediction model, we are adding context-driven variables directly into our data pipeline:

* **Visit Intent Feature**: Designing a front-end "Visit Intent" selection feature (like: general check-up, minor injury, prescription renewal). Capturing this quick input from the user before generating results significantly improves machine learning prediction accuracy, as different clinical pathways experience highly variable processing velocities.

* **Predicted Hours Busy Display**: Beyond showing the immediate live estimate, facility profile views will incorporate historical trend charts displaying predicted busy hours throughout the day. This data allows users to make informed, proactive decisions on when to delay or accelerate their departures.


### **3. EV Data Transparency & Management (Automotive Data Visibility)**: 

An application addressing the lack of clear data visibility for electric vehicle (EV) owners regarding background data consumption and battery optimization.

* **Transparency Layer**: Demystifying exactly how much metrics and telemetry data vehicles (such as Tesla models) run in the background.

* **Smart Reminders**: Using active battery percentage tracking to push automated, highly contextual charging notifications and power-saving reminders to the user's device.

### **Group goals for the next week**:

* Talk to the professors to make sure our top picks are actually doable from a technical standpoint.
* Pick the one idea our group is going to go for development.
* Set up the project repo and get ready to start working on the Requirements Specification.

---

## Week 2

### **Summary of Discussion**

For week 2, the group discussed and finalized the domain focus and decided on what the main application idea should be. After the time spent on Week 1 sharing ideas, brainstorming, and sharing opinions, the group decided to do any possible healthcare applications and we finalized on building up a system to tackle hospital waiting times. Instead of showcasing statistics or any delayed check-in data, the group also decided to make a predictive machine learning model that could estimate facility loads in real time. The group also discussed the features we could use to make sure our project is unique and different from the typical navigation apps.

### **To-Do List and Follow-Up Research**
* **Foreigner Care Access & Insurance Integration**: Looking into how national health insurance works for international students, visitors, and expats, so we can figure out what features we need for solid English and other foreign-language support.
* **Accessibility Assessment**: Checking what kind of support would actually help foreigners navigate local medical services they're not familiar with.
* **Field Survey Deployments**: Planning to survey elderly people and healthcare professionals to get their input. We'll reach out through email, direct messages, and phone calls.
* **Advanced Technology Exploration**: Digging deeper into how we can safely bring in things like AI forecasting, cybersecurity measures, and encrypted databases into our system.

### **Professor's Advice**

The project should be realistic and doable within 14 weeks. Taking note of that, the group is making sure to be careful on scoping the data requirements. Making sure the prediction models will rely on the features that are very easy to access, using the public datasets and structured synthetics, and steer clear of the overly complex dependencies that could make our delivery timeline at risk.

---

## Week 3

### **Accomplished**

* We have the datasets for Hong Kong, UK, Scotland
* Project based on the hospital tracker using NHS API or Manual scrape
* Github repository
* Mostly gonna base on the logs and datasets of other countries(not Japan)
* Make our own API but improve it base on the NHS

### **Professor's Advice**

* Could ask them that we will use it for class (email)
* if manual logging using a machine learning mode (need a couple of weeks for it)
* frequency would be quite frequent

### **To-Do List**

1. Get permission to get datasets
2. Start scraping data


---

## Week 4

### **To-Do List**

* Project Proposal Summary with 2 paragraphs
* Have the template ready for the slides
* Conduct interviews and surveys

### Accomplished

* Using DeepL API for our language for our language support system
* Started scraping data from website

### **Professor's Advice**

* Incentives like rankings
* Interviews or surveys can be external (different people from differnt industries)
* 4-5 people can be interviewed (can be a small survey with friends or families)
* You will know your problems better if you do survey and get information from other people using the knowledge of other people
* 2-4 interviews sufficient
* At least 100 data points

---

## Week 5

### **To-Do List 

* Have some progress with the midterm presentation slides
* Start discussing about the presentation coordinator and the documentation

### **Accomplished**

* Able to have the template ready for the slides
* Discussed about how the slides would look like
* Did interviews and received a good amount of  data from the survey conducted to different countries

### **Professor's Advice**

* Don't make the slides too wordy
* Keep the designs simple 

---

## Week 6

### **Accomplished**

* Finalized the slides and discussed each slide
* Took notes for extra information for the slides

### **To-Do List**

* Be ready for the midterm presentation
* Make sure to practice
* Be ready for the questions

### **Professor's Advice**

* Should focus on design and not the implementation for the presentation

---

## Week 7

### **Accomplished**

* Finished the midterm presentation

### **To-Do List**

* Start assigning members for the UML diagrams
* Assign the implementation team and the system architecture team

### **Professor's Advice**

* Should not do navigation
* Should have briefly explained and shocased the UI

---

## Week 8

Mahiro
* Class Diagram

Bien
* Use Case Diagram
* Activity Diagram

Jake
* State Diagram
* Sequence Diagram

Ibuki
* Components Diagram

---

## Week 9

### **Notes**

* Just the standard
* Eye the data
* Implementation should be smooth if we have data and diagrams
* Gotta do it in 2 weeks
* All of the data should be taken (thousands)
* Can use historical data
* 80-20 or 70-30 from historical data
* Only test once and do not have to touch the model again
* If the data is the same it's fine
* Make sure people are not maliciously doing false stuff
* In the end it has to be the same data because it will not run

---
