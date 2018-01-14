import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../company';
import { CompanyEnvironment } from '../../../../company/companyenvironments/companyenvironment';
import { CompaniesService } from '../../../../companies.service';
import { ProductsSelectComponent } from '../../../../../products/products-select/products-select.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProductInstallation } from '../../../../../product-installations/productinstallation';
import { Product } from '../../../../../products/product';
import { ProductCardComponent } from '../../../../../products/product/product-card/product-card.component';
import { ProductInstallationsService } from '../../../../../product-installations/product-installations.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-environment-software',
  templateUrl: './company-environment-software.component.html',
  styleUrls: ['./company-environment-software.component.css']
})
export class CompanyEnvironmentSoftwareComponent implements OnInit {
  selectedProducts = new Array<Product>();
  productinstallations = new Array<ProductInstallation>();
  productDialogRef: MatDialogRef<ProductsSelectComponent>;
  companyId: string;
  environmentId: string;
  company: Company;
  companyenvironment: CompanyEnvironment;
  constructor(private dialog: MatDialog, private service: ProductInstallationsService,
    private route: ActivatedRoute,
    private companiesService: CompaniesService,
    private productInstallationsService: ProductInstallationsService
  ) { }

  ngOnInit() {
    this.route.parent.params.map(params => [params['companyId'], params['environmentId']])
      .subscribe(([companyId, environmentId]) => {
        this.getCompanyEnvironment(companyId, environmentId);
      });
  }

  getCompanyEnvironment(companyId: string, environmentId: string): void {
    if (companyId && environmentId) {
      this.companyId = companyId;
      this.environmentId = environmentId;
      this.companiesService.getCompanyEnvironment(companyId, environmentId)
        .then(companyEnvironment => this.updateCompanyEnvironment(companyEnvironment));
    }
  }

  updateCompanyEnvironment(companyEnvironment: CompanyEnvironment) {
    this.companyenvironment = companyEnvironment;
    this.companiesService.getCompany(companyEnvironment.companyGuid).then(company => this.company = company);
    this.productInstallationsService.getProductInstallations(null, companyEnvironment.companyGuid)
      .then(installs => this.updateInstalls(installs, companyEnvironment));
  }

  updateInstalls(installs: Array<ProductInstallation>, companyEnvironment: CompanyEnvironment) {
    if (companyEnvironment) {
      this.productinstallations = _.filter(installs, f => f.companyEnvironmentGuid === companyEnvironment.guid);
    } else {
      this.productinstallations = installs;
    }
  }

  openProductsDialog() {
    this.productDialogRef = this.dialog.open(ProductsSelectComponent/*, {
      height: '400px',
      width: '600px',
    }*/);
    this.productDialogRef.afterClosed().subscribe(test => this.handleSelected(test));
  }

  handleSelected(ref) {
    const selectedProducts = this.productDialogRef.componentInstance.selectedProducts;
    const productinstallations = new Array<ProductInstallation>();
    for (const selected of selectedProducts) {
      const exist = _.find(this.productinstallations, productinstallation => productinstallation.productGuid === selected.guid);
      if (!exist) {
        const productinstallation = this.service.createProductInstallation(true, this.company.guid, selected.guid,
          this.companyenvironment.guid, null, false);
        this.productinstallations.push(productinstallation);
        productinstallations.push(productinstallation);
      }
    }
    this.service.postProductInstallations(productinstallations);
  }

  deleteProductInstallation(productinstallation: ProductInstallation) {
    this.service.deleteProductInstallation(productinstallation);
    this.productinstallations.splice(this.productinstallations.indexOf(productinstallation));
  }
}
