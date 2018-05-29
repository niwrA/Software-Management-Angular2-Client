
import {map} from 'rxjs/operators';

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../product';
import { ProductVersion } from '../productversion';
import { ProductsService } from '../../products.service';
import { NavLink } from '../../../shared/appnavbar/navlink';

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
  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
    new NavLink('features', 'Features', false),
    new NavLink('issues', 'Issues', false),
    new NavLink('configoptions', 'Config Options', false),
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
    this.route.params.pipe(map(params => [params['productId'], params['productVersionId']]))
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
