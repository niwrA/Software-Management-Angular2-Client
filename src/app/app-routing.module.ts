import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';

import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contacts/contact/contact.component';

import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './companies/company/company.component';

import { LoginComponent } from './admin/login/login.component';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectDetailsComponent } from './projects/projectdetails/projectdetails.component';

import { TechnologiesComponent } from './technologies/technologies.component';
import { TechnologyComponent } from './technologies/technology/technology.component';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';

import { ProductVersionsComponent } from './products/productversions/productversions.component';
import { ProductVersionComponent } from './products/productversions/productversion/productversion.component';

import { ProductFeaturesComponent } from './products/productfeatures/productfeatures.component';
import { ProductFeatureComponent } from './products/productfeatures/productfeature/productfeature.component';

import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'contacts/:contactId',
    component: ContactComponent
  },
  {
    path: 'companies',
    component: CompaniesComponent
  },
  {
    path: 'companies/:companyId',
    component: CompanyComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'projects/:projectId',
    component: ProjectComponent,
    children: [
      {
        path: 'details',
        component: ProjectDetailsComponent
      }
    ]
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/:productId',
    component: ProductComponent,
    children: [
      {
        path: 'productversions',
        component: ProductVersionsComponent
      },
      {
        path: 'productfeatures',
        component: ProductFeaturesComponent
      }]
  },

  {
    path: 'productversions/:productVersionId',
    component: ProductVersionComponent,
    children: [
      {
        path: 'productfeatures',
        component: ProductFeaturesComponent
      }]
  },
  {
    path: 'technologies',
    component: TechnologiesComponent
  },
  {
    path: 'technologies/:technologyId',
    component: TechnologyComponent
  },
  {
    path: 'productfeatures/:productFeatureId',
    component: ProductFeatureComponent
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
