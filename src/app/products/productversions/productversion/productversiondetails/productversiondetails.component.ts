
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductVersion } from '../../productversion';
import { ProductsService } from '../../../products.service';

@Component({
  selector: 'app-productversiondetails',
  templateUrl: './productversiondetails.component.html',
  styleUrls: ['./productversiondetails.component.css']
})
export class ProductVersionDetailsComponent implements OnInit {
  productversion: ProductVersion;
  productId: string;
  versionId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => this.getProductVersion(params.get('productId'), params.get('productVersionId')))
  };

  getProductVersion(productId: string, versionId: string): void {
    if (productId && versionId) {
      this.productId = productId;
      this.versionId = versionId;
      this.service.getProductVersion(productId, versionId).then(productVersion => this.productversion = productVersion);
    }
  }
}
