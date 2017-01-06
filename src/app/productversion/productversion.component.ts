import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductVersion } from '../productversions/productversion';
import { ProductVersionsService } from '../productversions/productversions.service';

@Component({
  selector: 'app-productversion',
  templateUrl: './productversion.component.html',
  styleUrls: ['./productversion.component.css']
})
export class ProductVersionComponent implements OnInit {
  productversion: ProductVersion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductVersionsService) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.service.getProductVersion(params['productVersionId']))
      .subscribe((productVersion: ProductVersion) => this.productversion = productVersion);
  }
}
