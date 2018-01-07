#Adding a component
A component is an indepent part of code and layout, which should be able to work as independently as possible. If you need to add a new component, do the following. Again, you can do all these things while ng serve is left running. THe only issue is that routing isn't working 100% yet, so you may need to reset the address bar to the root (localhost:4200) 

##Scaffold it with Angular CLI
ng g component <componentname>

If the component is for a list of items, use the plural name. If the component is for a single item, use the singular. And always use lowercase.

Will generate the folder and four files for the new component, and add it to the main app module (app.main.ts). Manual steps to do next:

##Create componentitem class
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
For state management, we use ui-router for angular 2. This is a simpler and imho more robust setup for routing than the default angular 2 routing that supports child-routing, has some nice visual debugging tools and so on. There are some minor issues with it currently, but it was still easier to work with. For more details, see:
https://ui-router.github.io/tutorial/ng2/hellogalaxy

Similar to angular's own router, you indicate the target of your route with ```<ui-view></ui-view>```. When creating a link between components, you use ui-router's uiSref instead of href, optionally with parameters, for instance like this:
```html
<button uiSref='productversion.companies' [uiParams]="{ productVersionId: productversion.Guid }" mat-raised-button mat-tooltip="todo: installations of this version">Installations</button>
```

The example above creates a child route for productversion to place the companies component, and will look for a ui-view within the main ui-view.

##import the state in app.main.ts
Add the state to the import list and to the routeconfig in the app.main.
