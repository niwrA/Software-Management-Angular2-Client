# SOFTWAREMANAGEMENT

This project is intended to setup an angular 2 client for a full circle software management system, that brings together all software management related functionality, who took part in what project, what technologies were used, what are the technologies best practices, what products were used or created during the project, what versions were released, which bugs/known issues and features are in which version, what configuration options are there and where/how do they work, what environments are they installed in, etc. The UI will be setup generically, and can then be serviced by a backend database and/or external services as needed. 

The UI is setup using components only currently, and does not do any dynamic module loading yet. This may change in the future. It uses the command pattern (first C in CQRS) to communicate changes to a backend independently of updating the frontend, so UI updates are immediate. For more information, see also: https://www.linkedin.com/pulse/i-command-arwin-van-arum?trk=prof-post

Chat with us at https://software-management.slack.com/

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1. 

!Tip: open one command for ng serve (which runs and live recompiles the app in dev mode) and one command for generating new components, installing new packages and so on. 

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## UI Coding
UI is using angular material 2 as much as possible. For actual samples, see here:
https://material2-demoapp.firebaseapp.com/date-picker
And some perhaps better examples here:
https://justindujardin.github.io/ng2-material/#/components/card

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
