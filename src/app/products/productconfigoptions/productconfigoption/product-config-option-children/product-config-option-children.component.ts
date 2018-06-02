
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../../product';
import { ProductFeature } from '../../../productfeatures/productfeature';
import { ProductsService } from '../../../products.service';
import { ProductConfigOption } from '../../productconfigoption';
import * as _ from 'lodash';
@Component({
  selector: 'app-product-config-option-children',
  templateUrl: './product-config-option-children.component.html',
  styleUrls: ['./product-config-option-children.component.css']
})
export class ProductConfigOptionChildrenComponent implements OnInit {

  product: Product;
  configoption: ProductConfigOption;
  productId: string;
  featureId: string;
  configoptionId: string;
  children: Array<ProductConfigOption>;
  filteredchildren: Array<ProductConfigOption>;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => this.getProductConfigOption(params.get('productId'), params.get('configOptionId')))
  }

  getProductConfigOption(productId: string, configoptionId): void {
    if (productId && configoptionId) {
      this.productId = productId;
      this.service.getProduct(productId).then(product => this.updateProductConfig(product, configoptionId));
    }
  }
  updateChildren(configoptionId: string) {
    this.children = _.filter(this.product.configoptions, function (c) { return c.parentGuid === configoptionId });
  }
  updateProductConfig(product: Product, configoptionId: string) {
    this.product = product;
    this.configoption = _.find(product.configoptions, function (c) { return c.guid === configoptionId });
    this.updateChildren(configoptionId);
    this.getProductConfigOptions();
  }
  getProductConfigOptions(): void {
    const searchText = this.searchText;
    if (this.children) {
      if (searchText && searchText.length > 0) {
        this.filteredchildren = _.filter<ProductConfigOption>
          (this.children, prj => prj.name.indexOf(this.searchText) > -1);
      } else {
        this.filteredchildren = this.children;
      }
    }
  }

  createProductConfigOptionChild(name: string): void {
    const productconfigoption = this.service.createProductConfigOptionChild(true, this.product, this.configoption, name);
    this.updateChildren(this.configoption.guid);
    this.getProductConfigOptions();
  }

  deleteProductConfigOptionChild(productconfigoption: ProductConfigOption): void {
    this.service.removeChildFromProductConfigOption(this.product, productconfigoption, this.configoption);
    this.updateChildren(this.configoption.guid);
    this.getProductConfigOptions();
  }

}
