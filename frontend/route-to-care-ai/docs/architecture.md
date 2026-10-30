# Architecture gallery

These diagrams document the system the team designed around the CarePath Navigator prototype. They include both high-level architecture and detailed interaction models.

Some diagrams retain NHS labels from the project's early data-source exploration. The team's final reported model evaluation used Hong Kong public hospital data, and not every planned service shown here was implemented in the live prototype.

## System context

The patient shares search preferences and location data, while the system combines facility information and queue data to return recommendations.

![System context diagram](../images/system-context.png)

## Container architecture

The proposed application separates the React/TypeScript client, Flask application services, prediction service, and relational data storage.

![Container diagram](../images/container-diagram.png)

## Component architecture

![Component diagram](../images/components-diagram.jpg)

## Data pipeline

The proposed pipeline validates, anonymizes, preprocesses, predicts, ranks, and formats hospital options before displaying them to the user.

![Pipe and filter diagram](../images/pipe-and-filter-diagram.png)

## User interaction sequence

![Sequence diagram](../images/sequence-diagram.jpg)

## Application states

![State diagram](../images/state-diagram.png)

## Use cases

![Use-case diagram](../images/use-case-diagram.jpg)

## Domain model

![Class diagram](../images/class-diagram.jpg)

## Proposed deployment

![Deployment diagram](../images/deployment-diagram.jpg)
