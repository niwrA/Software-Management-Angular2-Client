import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products.service';
import { ProductVersion } from './productversion';
import { Product } from '../product';
import * as _ from 'lodash';

@Component({
  selector: 'app-productversions',
  templateUrl: './productversions.component.html',
  styleUrls: ['./productversions.component.css'],
  providers: [ProductsService]
})
export class ProductVersionsComponent implements OnInit {
  productGuid: string;
  product: Product;
  productversions: Array<ProductVersion>;
  selectedProductVersion: ProductVersion;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService,
  ) { }

  ngOnInit() {
    this.route.parent.params.map((params: Params) => this.productGuid = params['productId'])
      .subscribe((productversions: Array<ProductVersion>) => this.updateVersions(productversions));
  }

  updateVersions(productversions: Array<ProductVersion>): void {
    this.service.getProduct(this.productGuid).then(product => this.updateProduct(product));
  }

  updateProduct(product: Product): void {
    this.product = product;
    this.getProductVersions('');
  }

  onSelect(productVersion: ProductVersion): void {
    this.selectedProductVersion = productVersion;
  }

  clearSelection(): void {
    this.selectedProductVersion = null;
  }

  ProductVersionDetail(event, Product: ProductVersion): void {
/*    event.stopPropagation();
    this.router.navigate(['/Product', Product.Guid]);
*/  }

  getProductVersions(searchText: string): void {
    if (this.product && this.product.versions) {
      if (searchText.length > 0) {
        this.productversions = _.filter<ProductVersion>(this.product.versions, prj => prj.name.indexOf(this.searchText) > -1);
      } else {
        this.productversions = this.product.versions;
      }

    }
  }

  createProductVersion(name: string): void {
    const productversion = this.service.createProductVersion(true, this.product, name);
    // this.product.versions.splice(0, 0, productversion);
  }

}
