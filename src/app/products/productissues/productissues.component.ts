import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products.service';
import { ProductIssue } from './productissue';
import { Product } from '../product';
import * as _ from 'lodash';

@Component({
  selector: 'app-productissues',
  templateUrl: './productissues.component.html',
  styleUrls: ['./productissues.component.css'],
  providers: [ProductsService]
})
export class ProductIssuesComponent implements OnInit {
  productGuid: string;
  product: Product;
  versionGuid: string;
  productissues: Array<ProductIssue>;
  selectedProductIssue: ProductIssue;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService,
  ) { }

  ngOnInit() {
    this.route.parent.params.map((params: Params) => [params['productId'], params['productVersionId']])
      .subscribe(([productId, versionId]) => {
        this.update(productId, versionId);
      });
  }

  update(productId: string, versionId: string) {
    if (productId) {
      this.productGuid = productId;
      this.versionGuid = versionId;
      this.updateIssues(productId);
    }
  }

  updateIssues(productGuid: string): void {
    this.service.getProduct(productGuid).then(product => this.updateProduct(product));
  }

  updateProduct(product: Product): void {
    this.product = product;
    this.getProductIssues('');
  }

  onSelect(productVersion: ProductIssue): void {
    this.selectedProductIssue = productVersion;
  }

  clearSelection(): void {
    this.selectedProductIssue = null;
  }

  // todo: do we want to get/hold the versionsequence in this component for speed?
  getProductIssues(searchText: string): void {
      if (searchText.length > 0) {
        issues = _.filter<ProductIssue>(issues, prj => (prj.name.indexOf(this.searchText) > -1
          || (prj.description && prj.description.indexOf(this.searchText) > -1)));
      }
      if (this.versionGuid) {
        const sequence = this.product.getVersionSequenceById(this.versionGuid);
        issues = _.filter<ProductIssue>(issues, prj => prj.firstVersionSequence &&
          prj.firstVersionSequence <= sequence); // todo: add >= lastversion later
      }
      this.productissues = issues;
    }
  }

  createProductIssue(name: string): void {
    const productissue = this.service.createProductIssue(true, this.product, name, this.versionGuid);
    this.getProductIssues(name);
  }

  deleteProductIssue(productissue: ProductIssue): void {
    this.service.deleteProductIssue(this.product, productissue);
    this.getProductIssues(this.searchText);
  }
}
