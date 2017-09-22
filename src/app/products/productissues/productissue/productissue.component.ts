import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../product';
import { ProductIssue } from '../productissue';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-productissue',
  templateUrl: './productissue.component.html',
  styleUrls: ['./productissue.component.css']
})
export class ProductIssueComponent implements OnInit {
  productissue: ProductIssue;
  product: Product;
  productId: string;
  issueId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.params.map(params => [params['productId'], params['productIssueId']])
      .subscribe(([productId, issueId]) => {
        this.getProductIssue(productId, issueId);
      });
  }

  getProductIssue(productId: string, issueId: string): void {
    if (productId && issueId) {
      this.productId = productId;
      this.service.getProduct(productId).then(product => this.product = product);
      this.issueId = issueId;
      this.service.getProductIssue(productId, issueId).then(productIssue => this.productissue = productIssue);
    }
  }
}