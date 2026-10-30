# CarePath Navigator

**A hospital decision-support prototype that helps patients compare nearby facilities using predicted wait times, distance, and confidence estimates.**

[View the live prototype](https://route-to-care-ai.lovable.app) · [Read the project documentation](https://daitera1.github.io/PBL3-Group-D/)

> CarePath Navigator is an academic team project. It is not a diagnostic, emergency, or clinical decision-making tool.

## The problem

Patients often choose a hospital based only on distance, even when another nearby facility may be able to provide care sooner. CarePath Navigator was designed to make that decision clearer by combining hospital information, location, and predicted waiting times in one interface.

Our early research included a survey of 89 respondents:

- 83% reported experiencing long hospital waiting times.
- 82% wanted access to real-time or predicted waiting times.
- 71% valued hospital reviews.
- 69% were interested in language support.

The team also interviewed healthcare professionals, including Dr. Vito LaRocca, MD, MPH, and Charlene DiLoffi, to challenge our assumptions about safety, usability, and how patients make care decisions.

## Final prototype

The final concept allows a user to:

- search for nearby hospitals;
- compare the closest and potentially fastest options;
- view a predicted wait time with a confidence range;
- review hospital and department information; and
- open navigation after selecting a facility.

![CarePath Navigator system context](images/system-context.png)

## Reported model results

The team evaluated an XGBoost regression model on held-out Hong Kong public hospital wait-time data.

| Metric | Reported result |
| --- | ---: |
| Mean Absolute Error | 5.93 minutes |
| Root Mean Squared Error | 8.42 minutes |
| R² | 0.8105 |

One prototype result displayed a predicted wait of 35.3 minutes with 83.1% confidence and a ±6.0-minute interval.

The training notebook, dataset, and serialized model are not included in this repository snapshot, so the figures above are reported results from the team's final evaluation rather than independently reproducible benchmarks.

## Architecture

The proposed system architecture used a React/TypeScript client, a Python Flask API, an XGBoost prediction service, a relational database, and a mapping service. The live prototype demonstrates the user journey; the diagrams document the broader designed system.

![CarePath Navigator container diagram](images/container-diagram.png)

See the [`architecture gallery`](docs/architecture.md) for the component, class, deployment, sequence, state, use-case, and data-pipeline views.

## My contribution

**Jake Smith — Project Manager and Presenter**

I coordinated the team’s requirements, architecture, development priorities, and presentation work. I contributed the state and sequence diagrams, supported implementation and testing, and worked with Hanz Ranen on the final demonstration video. I was responsible for keeping the research, product scope, technical design, and final story aligned as the project changed.

## Team

CarePath Navigator was developed as a group project by:

- Jacob Smith — Project Manager
- Bien Alolod
- Sadia Islam
- Hanz Ranen
- Daisuke Terauchi
- Mahiro Ueda
- Ibuki Yasuda

## Repository guide

```text
carepath-navigator/
├── README.md
├── docs/                 Project proposal, requirements, design, and project log
├── images/               System and UML diagrams
└── legacy/               Early NHS data-source exploration
```

## Data-source history

The project changed during development. The team initially explored UK/NHS data sources because of their documentation and potential for future live integration. The final model evaluation reported in this README used **Hong Kong public hospital data only**.

The NHS scraper in [`legacy/nhs_scraper.py`](legacy/nhs_scraper.py), along with NHS references in some planning documents and diagrams, records that earlier exploration. It is not presented as the final production data pipeline.

## Limitations and next steps

- Predictions require current, reliable hospital data and should display freshness and uncertainty.
- The reported model cannot be reproduced from this snapshot without the original dataset and training artifacts.
- Recommendations must never delay emergency care or replace professional medical judgment.
- Future work includes controlled usability testing, data-quality monitoring, stronger privacy controls, accessibility testing, and validated live-data partnerships.

## Academic and safety notice

This repository documents a student prototype and its design process. Do not use it to make emergency or medical decisions. In an emergency, contact the appropriate local emergency service.
