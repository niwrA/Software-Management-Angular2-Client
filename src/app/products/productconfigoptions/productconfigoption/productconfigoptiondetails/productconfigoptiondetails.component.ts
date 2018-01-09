import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../../product';
import { ProductFeature } from '../../../productfeatures/productfeature';
import { ProductsService } from '../../../products.service';
import { ProductConfigOption } from '../../productconfigoption';
import {
  RenameProductConfigOptionCommand, ChangeDescriptionOfProductConfigOptionCommand,
  ChangeDefaultValueForProductConfigOptionCommand
} from '../../../product/product.commands';
import * as _ from 'lodash';

@Component({
  selector: 'app-productconfigoptiondetails',
  templateUrl: './productconfigoptiondetails.component.html',
  styleUrls: ['./productconfigoptiondetails.component.css']
})
export class ProductConfigOptionDetailsComponent implements OnInit {
  product: Product;
  configoption: ProductConfigOption;
  productfeature: ProductFeature;
  previousConfigOption: ProductConfigOption;
  productId: string;
  featureId: string;
  configoptionId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.parent.params.map(params => [params['productId'], params['productFeatureId'], params['configOptionId']])
      .subscribe(([productId, featureId, configoptionId]) => {
        this.getProductConfigOption(productId, featureId, configoptionId);
      });
  }

  getProductConfigOption(productId: string, featureId: string, configoptionId): void {
    if (productId) {
      this.productId = productId;
      this.service.getProduct(productId).then(product => this.updateProductConfig(product, configoptionId));
    }
    // maybe just get from product?
    if (productId && featureId) {
      this.featureId = featureId;
      this.service.getProductFeature(productId, featureId).then(productFeature => this.productfeature = productFeature);
    }
  }
  updateProductConfig(product: Product, configoptionId: string) {
    this.product = product;
    this.configoption = _.find(product.configoptions, function (c) { return c.guid === configoptionId });
    this.previousConfigOption = this.configoption.clone();
  }

  changeName(): void {
    if (this.previousConfigOption !== undefined) {
      if (this.configoption.name !== this.previousConfigOption.name) {
        const renameCommand = new RenameProductConfigOptionCommand(this.configoption, this.previousConfigOption.name);
        this.service.postCommand(renameCommand, false);
        this.previousConfigOption.name = this.configoption.name;
      }
    } else {
      this.previousConfigOption = this.configoption.clone();
    }
  }

  changeDefaultValue(): void {
    if (this.previousConfigOption !== undefined) {
      if (this.configoption.defaultValue !== this.previousConfigOption.defaultValue) {
        const redefaultValueCommand = new ChangeDefaultValueForProductConfigOptionCommand
          (this.configoption, this.previousConfigOption.defaultValue);
        this.service.postCommand(redefaultValueCommand, false);
        this.previousConfigOption.defaultValue = this.configoption.defaultValue;
      }
    } else {
      this.previousConfigOption = this.configoption.clone();
    }
  }

  changeDescription(): void {
    if (this.previousConfigOption !== undefined) {
      if (this.configoption.description !== this.previousConfigOption.description) {
        const renameCommand = new ChangeDescriptionOfProductConfigOptionCommand(this.configoption);
        this.service.postCommand(renameCommand, false);
        this.previousConfigOption.description = this.configoption.description;
      }
    } else {
      this.previousConfigOption = this.configoption.clone();
    }
  }
}
