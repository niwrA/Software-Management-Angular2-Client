import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UIRouterModule } from 'ui-router-ng2';

import { AppComponent } from './app.component';

import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { ProductsComponent } from './products/products.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { CustomersComponent } from './customers/customers.component';

import { ProjectsService } from './projects/projects.service';

import { Transition } from 'ui-router-ng2';

let projectsState = { name: 'projects', url: '/projects', component: ProjectsComponent };
let productsState = { name: 'products', url: '/products', component: ProductsComponent };
let customersState = { name: 'customers', url: '/customers', component: CustomersComponent };
let technologiesState = { name: 'technologies', url: '/technologies', component: TechnologiesComponent };

const projectState = {
  name: 'project',
  url: '/projects/:id',
  component: ProjectComponent,
  resolve: [
    {
      token: 'project',
      deps: [Transition, ProjectsService],
      resolveFn: (trans, projectsService) => projectsService.getProject(trans.params().id)
    }
  ]
}
// other imports 
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProjectsComponent,
    ProjectComponent,
    TechnologiesComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    UIRouterModule.forRoot({ states: [projectsState, projectState, productsState, customersState, technologiesState], useHash: true })
  ],
  providers: [ProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
