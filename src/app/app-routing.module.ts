import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contact/contact.component';

import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailsComponent } from './projectdetails/projectdetails.component';

import { TechnologiesComponent } from './technologies/technologies.component';
import { TechnologyComponent } from './technology/technology.component';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';

import { ProductVersionsComponent } from './productversions/productversions.component';
import { ProductVersionComponent } from './productversion/productversion.component';

import { ProductFeaturesComponent } from './productfeatures/productfeatures.component';
import { ProductFeatureComponent } from './productfeature/productfeature.component';

import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
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