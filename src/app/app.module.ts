import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as _ from 'lodash';

import { AppComponent } from './app.component';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsService } from './projects/projects.service';

import { CustomersComponent } from './customers/customers.component';

import { StateRegistry, Transition, UIRouterModule } from 'ui-router-ng2';
import { ContactsComponent } from './contacts/contacts.component';

import { CompaniesComponent } from './companies/companies.component';
import { CompaniesService } from './companies/companies.service';
import { CompanyComponent } from './company/company.component';

import { TechnologiesComponent } from './technologies/technologies.component';
import { TechnologyComponent } from './technology/technology.component';
import { TechnologiesService } from './technologies/technologies.service';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductsService } from './products/products.service';
import { ProductVersionsComponent } from './productversions/productversions.component';
import { ProductVersionsService } from './productversions/productversions.service';

let projectsState = { name: 'projects', url: '/projects', component: ProjectsComponent };
let productsState = { name: 'products', url: '/products', component: ProductsComponent };
let companiesState = { name: 'companies', url: '/companies', component: CompaniesComponent };
let contactsState = { name: 'contacts', url: '/contacts', component: ContactsComponent };
let technologiesState = { name: 'technologies', url: '/technologies', component: TechnologiesComponent };

let projectState = {
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
let companyState = {
  name: 'company',
  url: '/companies/:id',
  component: CompanyComponent,
  resolve: [
    {
      token: 'company',
      deps: [Transition, CompaniesService],
      resolveFn: (trans, companiesService) => companiesService.getCompany(trans.params().id)
    }
  ]
}
let technologyState = {
  name: 'technology',
  url: '/technologies/:id',
  component: TechnologyComponent,
  resolve: [
    {
      token: 'technology',
      deps: [Transition, TechnologiesService],
      resolveFn: (trans, technologiesService) => technologiesService.getTechnology(trans.params().id)
    }
  ]
}
let productState = {
  name: 'product',
  url: '/products/{productId}',
  component: ProductComponent,
  resolve: [
    {
      token: 'product',
      deps: [Transition, ProductsService],
      resolveFn: (trans, productsService) => productsService.getProduct(trans.params().productId)
    }
  ]
}

let productVersionsState = {
  name: 'product.productversions',
  url: '/productversions',
  component: ProductVersionsComponent,
  resolve: [
    {
      token: 'productversions',
      deps: [Transition, ProductVersionsService],
      resolveFn: (trans, productVersionsService) => productVersionsService.getVersionsForProduct(trans.params().productId)
    }
  ]
}

let productVersionState = {
  name: 'productversion',
  url: '/productversions/:id',
  component: ProductVersionsComponent,
  resolve: [
    {
      token: 'productversion',
      deps: [Transition, ProductVersionsService],
      resolveFn: (trans, productVersionsService) => productVersionsService.getProductVersion(trans.params().id)
    }
  ]
}

export let routerConfig = {
  otherwise: '/',
  states: [projectsState, projectState, productsState, productState, contactsState, companiesState, companyState, 
  technologiesState, technologyState, productVersionsState, productVersionState ]
};
// other imports 
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    UIRouterModule.forRoot(routerConfig)  // comment out this line before ng serve, then remove it again when ng serve is running
  ],
  declarations: [
    AppComponent,
    ProductsComponent,
    ProjectsComponent,
    ProjectComponent,
    TechnologiesComponent,
    CustomersComponent,
    ContactsComponent,
    CompaniesComponent,
    CompanyComponent,
    TechnologyComponent,
    ProductComponent,
    ProductVersionsComponent
  ],
  providers: [ProjectsService, CompaniesService, TechnologiesService, ProductsService, ProductVersionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
