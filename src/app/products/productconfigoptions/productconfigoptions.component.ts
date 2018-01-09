
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
  product: Product;
  productfeature: ProductFeature;
  productconfigoptions: Array<ProductConfigOption>;
  selectedProductConfigOption: ProductConfigOption;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService,
  ) { }

  ngOnInit() {
    this.route.parent.params.map(params => [params['productId'], params['productFeatureId']])
      .subscribe(([productId, featureId]) => {
        this.getProductFeature(productId, featureId);
      });
  }

  getProductFeature(productId: string, featureId: string): void {
    if (productId && featureId) {
      this.productId = productId;
      this.service.getProduct(productId).then(product => this.updateProduct(product));
      this.featureId = featureId;
      this.service.getProductFeature(productId, featureId)
        .then(productFeature => this.productfeature = productFeature);
    } else if (productId) {
      this.productId = productId;
      this.service.getProduct(productId).then(product => this.updateProduct(product));
    }
  }
  updateProductConfigs(configs: Array<ProductConfigOption>): void {
    this.productconfigoptions = configs;
  }
  updateProduct(product: Product): void {
    this.product = product;
    if (this.featureId) {
      this.productconfigoptions = _.filter<ProductConfigOption>
      (this.product.configoptions, prj => prj.productFeatureGuid === this.featureId);
    } else {
      this.productconfigoptions = this.product.configoptions; // todo: filter by featureId
    }
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
