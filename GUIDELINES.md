
#Guidelines

For components that form a new Domain/Microservice/RootAggregate, use Companies.
For components that are generic Microservices that  should work with and link to any 'Domain/Microservice' root-aggregate, use Links as an example.
For components that use data that link information from multiple domains, use CompanyRoleAssignment or ProjectRoleAssignment as examples.

## Scaffold the basics with Angular CLI 

This means use ng g component, ng g service, etc.)

If the component is for a list of items, use the plural name. If the component is for a single item, use the singular. Use camelcase as a naming convention. Use other existing UI as templates. 

# Services
A domain service contains all service interaction for all of the Domain/Microservice and is the only place where http happens. They are also almost exclusively read-only towards http - creating new data happens through the command class. 

Data received from http is considered to be in the shape of state objects. These state objects are then wrapped in typed wrapper classes that are the only way to access the state. This keeps everything easy to maintain and strongly typed. Check out companies/company.ts for an example.

As Angular CLI documents, services need to be manually added to the providers in app.module.

New data is also created through the service, but always also added locally as well as sent as update to the backend as a command. This ensures that the UI is never waiting for the backend. We may eventually use a background service for live synching data.

# UI interactive components with Angular Material
UI components generally done with the latest Angular Material. 
Material Components are imported in app.materials.module.ts
Generic UI components can get their own folder, such as file-upload.

# Routing
All routing is client side, using Angular's default routing (the newer one from Angular 4 and up). Currently all routing is in app-routing.module. All new components that need to receive routing need to be manually added here, Angular CLI doesn't do this for you.

Almost any UI component should be reachable through the routers. This may be a bit more work, but ensures that you can link to them directly. It makes the backend easier and prevents http lag. So much goes through router-outlets as a result. 

There is no generic crumb-trail in place yet, it's done manually now in places. This may even be preferable, not sure yet.

## building for production

Occasionally use ng serve --prod or ng build --prod to see if the client still builds for production.
