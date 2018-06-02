
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductFeature } from '../../productfeatures/productfeature';
import { Product } from '../../product';
import { ProductConfigOption } from '../productconfigoption'
import { ProductsService } from '../../products.service';
import * as _ from 'lodash';
import { NavLink } from '../../../shared/appnavbar/navlink';

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
  parent: ProductConfigOption;
  product: Product;

  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
    new NavLink('children', 'Children', false),
    new NavLink('installations', 'Installed On', false),
    new NavLink('links', 'Links', false),
    new NavLink('files', 'Files', false),
    new NavLink('commands', 'Audit', false)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => this.getProductConfigOption(
      params.get('productId'), params.get('productFeatureId'), params.get('configOptionId')))
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
    if (this.configoption) {
      const parentId = this.configoption.parentGuid;
      if (parentId) {
        this.parent = _.find(product.configoptions, function (c) { return c.guid === parentId });
      } else { this.parent = undefined }
    }
  }
}

