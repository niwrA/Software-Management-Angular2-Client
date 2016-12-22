import { StateRegistry, Transition, UIRouterModule } from 'ui-router-ng2';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsService } from './projects/projects.service';

import { CustomersComponent } from './customers/customers.component';

import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contact/contact.component';
import { ContactsService } from './contacts/contacts.service';

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
import { ProductVersionComponent } from './productversion/productversion.component';

export const projectsState = { name: 'projects', url: '/projects', component: ProjectsComponent };
export const productsState = { name: 'products', url: '/products', component: ProductsComponent };
export const companiesState = { name: 'companies', url: '/companies', component: CompaniesComponent };
export const contactsState = { name: 'contacts', url: '/contacts', component: ContactsComponent };
export const technologiesState = { name: 'technologies', url: '/technologies', component: TechnologiesComponent };

export const projectState = {
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
export const companyState = {
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
export const technologyState = {
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
export const productState = {
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

export const productVersionsState = {
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

export const productVersionState = {
  name: 'productversion',
  url: 'productversions/{productVersionId}',
  component: ProductVersionComponent,
  resolve: [
    {
      token: 'productversion',
      deps: [Transition, ProductVersionsService],
      resolveFn: (trans, productVersionsService) => productVersionsService.getProductVersion(trans.params().productVersionId)
    }
  ]
}

export const contactState = {
  name: 'contact',
  url: '/contacts/{contactId}',
  component: ContactComponent,
  resolve: [
    {
      token: 'contact',
      deps: [Transition, ContactsService],
      resolveFn: (trans, contactsService) => contactsService.getContact(trans.params().contactId)
    }
  ]
}
