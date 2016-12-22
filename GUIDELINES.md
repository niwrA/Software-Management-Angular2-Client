If you need to add a new component, do the following. Again, you can do all these things while ng serve is left running. THe only issue is that routing isn't working 100% yet, so you may need to reset the address bar to the root (localhost:4200) 

#Scaffold it with Angular CLI

ng g component <componentname>

If the component is for a list of items, use the plural name. If the component is for a single item, use the singular. And always use lowercase.

Will generate the folder and four files for the new component, and add it to the main app module (app.main.ts). Manual steps to do next:

#create componentitem class

If this is a component for a new collection of items, first create a class for that item, in a new file in the componentfolder called something like <component>.ts

```typescript
export class Product {
    Name: string;
    Guid: string;
    EndDate?: Date;
}
```

##add dummy testdata

While we are still making the client only with no backend, create a mock-<componentnames>.ts file with 
##add a service for the component in the new folder
##add a state to transition to the component using the router (currently all in the ui-router-states.ts in the main app folder)
##import the state in app.main.ts
