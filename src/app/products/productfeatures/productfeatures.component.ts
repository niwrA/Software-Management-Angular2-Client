
import {map} from 'rxjs/operators';

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products.service';
import { ProductFeature } from './productfeature';
import { Product } from '../product';
import * as _ from 'lodash';

@Component({
  selector: 'app-productfeatures',
  templateUrl: './productfeatures.component.html',
  styleUrls: ['./productfeatures.component.css']
})
export class ProductFeaturesComponent implements OnInit {
  productGuid: string;
  product: Product;
  versionGuid: string;
  productfeatures: Array<ProductFeature>;
  selectedProductFeature: ProductFeature;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService,
  ) { }

  ngOnInit() {
    this.route.parent.params.pipe(map((params: Params) => [params['productId'], params['productVersionId']]))
      .subscribe(([productId, versionId]) => {
        this.update(productId, versionId);
      });
  }

  update(productId: string, versionId: string) {
    if (productId) {
      this.productGuid = productId;
      this.versionGuid = versionId;
      this.updateFeatures(productId);
    }
  }

  updateFeatures(productGuid: string): void {
    this.service.getProduct(productGuid).then(product => this.updateProduct(product));
  }

  updateProduct(product: Product): void {
    this.product = product;
    this.getProductFeatures('');
  }

  onSelect(productVersion: ProductFeature): void {
    this.selectedProductFeature = productVersion;
  }

  clearSelection(): void {
    this.selectedProductFeature = null;
  }

  getProductFeatures(searchText: string): void {
    if (this.product && this.product.features) {
      let features = this.product.features;
      if (searchText.length > 0) {
        features = _.filter<ProductFeature>(features, prj => (prj.name.indexOf(this.searchText) >  -1
        || (prj.description && prj.description.indexOf(this.searchText) > -1)));
      }
      if (this.versionGuid) {
        features = _.filter<ProductFeature>(features, prj => prj.firstVersionGuid === this.versionGuid
          || prj.requestedForVersionGuid === this.versionGuid);
      }
      this.productfeatures = features;
    }
  }

  createProductFeature(name: string): void {
    const productfeature = this.service.createProductFeature(true, this.product, name, this.versionGuid);
    this.getProductFeatures(name);
  }
  requestProductFeature(name: string): void {
    const productfeature = this.service.requestProductFeature(true, this.product, name, this.versionGuid);
    this.getProductFeatures(name);
  }

  deleteProductFeature(productfeature: ProductFeature): void {
    this.service.deleteProductFeature(this.product, productfeature);
    this.getProductFeatures(this.searchText);
  }
}
