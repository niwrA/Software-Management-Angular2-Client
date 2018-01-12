
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products.service';
import { ProductConfigOption } from './productconfigoption';
import { Product } from '../product';
import { ProductFeature } from '../productfeatures/productfeature';
import * as _ from 'lodash';

@Component({
  selector: 'app-productconfigoptions',
  templateUrl: './productconfigoptions.component.html',
  styleUrls: ['./productconfigoptions.component.css']
})
export class ProductConfigOptionsComponent implements OnInit {
  productId: string;
  featureId: string;
  parentId: string;
  product: Product;
  productfeature: ProductFeature;
  productconfigoptions: Array<ProductConfigOption>;
  selectedProductConfigOption: ProductConfigOption;
  searchText: string;
  showChildren: false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService,
  ) { }

  ngOnInit() {
    this.route.parent.params.map(params => [params['productId'], params['productFeatureId'], [params['parentId']]])
      .subscribe(([productId, featureId, parentId]) => {
        this.getProductFeature(productId, featureId, parentId);
      });
  }

  getProductFeature(productId: string, featureId: string, parentIdObj): void {
    let parentId = undefined;
    if (parentIdObj && !Array.isArray(parentIdObj)) {
      parentId = parentIdObj;
    }
    if (productId && featureId) {
      this.productId = productId;
      this.service.getProduct(productId).then(product => this.updateProduct(product, parentId));
      this.featureId = featureId;
      this.service.getProductFeature(productId, featureId)
        .then(productFeature => this.productfeature = productFeature);
    } else if (productId) {
      this.productId = productId;
      this.service.getProduct(productId).then(product => this.updateProduct(product, parentId));
    }
  }
  updateProductConfigs(configs: Array<ProductConfigOption>): void {
    this.productconfigoptions = configs;
  }
  updateProduct(product: Product, parentId: string): void {
    this.product = product;
    this.parentId = parentId;
    let productconfigoptions = new Array<ProductConfigOption>();
    if (this.featureId) {
      productconfigoptions = _.filter<ProductConfigOption>
        (this.product.configoptions, prj => prj.productFeatureGuid === this.featureId);
    } else {
      productconfigoptions = this.product.configoptions;
    }
    if (parentId) {
      productconfigoptions = _.filter<ProductConfigOption>
        (productconfigoptions, prj => prj.parentGuid === parentId);
    }
    this.productconfigoptions = productconfigoptions;

    this.getProductConfigOptions('');
  }

  onSelect(productVersion: ProductConfigOption): void {
    this.selectedProductConfigOption = productVersion;
  }

  clearSelection(): void {
    this.selectedProductConfigOption = null;
  }

  getProductConfigOptions(searchText: string): void {
    if (this.productconfigoptions) {
      if (searchText && searchText.length > 0) {
        this.productconfigoptions = _.filter<ProductConfigOption>
          (this.productconfigoptions, prj => prj.name.indexOf(this.searchText) > -1);
      } else {
        this.productconfigoptions = this.product.configoptions;
      }
      if (!this.showChildren) {
        this.productconfigoptions = _.filter<ProductConfigOption>
          (this.productconfigoptions, prj => !prj.parentGuid);
      }
    }
  }

  createProductConfigOption(name: string): void {
    const productconfigoption = this.service.createProductConfigOption(true, this.product, this.productfeature, name);
    this.getProductConfigOptions(name);
    // this.product.versions.splice(0, 0, productconfigoption);
  }

  deleteProductConfigOption(productconfigoption: ProductConfigOption): void {
    this.service.deleteProductConfigOption(this.product, this.productfeature, productconfigoption);
    this.getProductConfigOptions(this.searchText);
  }
}
