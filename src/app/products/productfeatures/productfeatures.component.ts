import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products.service';
import { ProductFeature } from './productfeature';
import { Product } from '../product';
import * as _ from 'lodash';

@Component({
  selector: 'app-productfeatures',
  templateUrl: './productfeatures.component.html',
  styleUrls: ['./productfeatures.component.css'],
  providers: [ProductsService]
})
export class ProductFeaturesComponent implements OnInit {
  productGuid: string;
  product: Product;
  productfeatures: Array<ProductFeature>;
  selectedProductFeature: ProductFeature;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService,
  ) { }

  ngOnInit() {
    this.route.parent.params.map((params: Params) => this.productGuid = params['productId'])
      .subscribe((productfeatures: Array<ProductFeature>) => this.updateVersions(productfeatures));
  }

  updateVersions(productfeatures: Array<ProductFeature>): void {
    this.service.getProduct(this.productGuid).then(product => this.updateProduct(product));
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
      if (searchText.length > 0) {
        this.productfeatures = _.filter<ProductFeature>(this.product.features, prj => prj.name.indexOf(this.searchText) > -1);
      } else {
        this.productfeatures = this.product.features;
      }

    }
  }

  createProductFeature(name: string): void {
    const productfeature = this.service.createProductFeature(true, this.product, name);
    this.getProductFeatures(name);
  }

}
