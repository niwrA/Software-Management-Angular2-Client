import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductFeature } from '../../productfeatures/productfeature';
import { Product } from '../../product';
import { ProductConfigOption } from '../productconfigoption'
import { ProductsService } from '../../products.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-productconfigoption',
  templateUrl: './productconfigoption.component.html',
  styleUrls: ['./productconfigoption.component.css']
})
export class ProductConfigOptionComponent implements OnInit {
  productfeature: ProductFeature;
  productId: string;
  featureId: string;
  configoptionId: string;
  configoption: ProductConfigOption;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.params.map(params => [params['productId'], params['productFeatureId'], params['configOptionId']])
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
  }
}

