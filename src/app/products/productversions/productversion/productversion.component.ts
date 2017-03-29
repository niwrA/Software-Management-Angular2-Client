import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../product';
import { ProductVersion } from '../productversion';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-productversion',
  templateUrl: './productversion.component.html',
  styleUrls: ['./productversion.component.css']
})
export class ProductVersionComponent implements OnInit {
  product: Product;
  productversion: ProductVersion;
  productId: string;
  versionId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.params.map(params => [params['productId'], params['productVersionId']])
      .subscribe(([productId, versionId]) => {
        this.getProductVersion(productId, versionId);
      });
  }

  getProductVersion(productId: string, versionId: string): void {
    if (productId && versionId) {
      this.productId = productId;
      this.versionId = versionId;
      this.service.getProductVersion(productId, versionId).then(productVersion => this.productversion = productVersion);
      this.service.getProduct(productId).then(product => this.product = product);

    }
  }
}
