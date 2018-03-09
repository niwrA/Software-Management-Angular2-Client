import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductIssue } from '../../productissue';
import { ProductsService } from '../../../products.service';
import { RenameProductIssueCommand, ChangeDescriptionOfProductIssueCommand,
  ResolveProductIssueCommand } from '../../../product/product.commands';
import { Product } from '../../../product';
@Component({
  selector: 'app-productissuedetails',
  templateUrl: './productissuedetails.component.html',
  styleUrls: ['./productissuedetails.component.css']
})
export class ProductIssueDetailsComponent implements OnInit {
  product: Product;
  productissue: ProductIssue;
  previousProductIssue: ProductIssue;
  productId: string;
  issueId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.parent.params.map(params => [params['productId'], params['productIssueId']])
      .subscribe(([productId, issueId]) => {
        this.getProductIssue(productId, issueId);
      });
  }
  update(newValue) {
    this.previousProductIssue = this.service.cloneProductIssue(newValue);
    this.productissue = newValue;
  }

  getProductIssue(productId: string, issueId: string): void {
    if (productId && issueId) {
      this.productId = productId;
      this.issueId = issueId;
      this.service.getProduct(productId).then(product => this.product = product);
      // todo: get this from product now?
      this.service.getProductIssue(productId, issueId).then(productIssue => this.update(productIssue));
    }
  }

  changeName(): void {
    if (this.previousProductIssue !== undefined) {
      if (this.productissue.name !== this.previousProductIssue.name) {
        const renameCommand = new RenameProductIssueCommand(this.productissue, this.product, this.previousProductIssue.name);
        this.service.postCommand(renameCommand, false);
        this.previousProductIssue.name = this.productissue.name;
      }
    } else {
      this.previousProductIssue = this.productissue;
    }
  }

  changeDescription(): void {
    if (this.previousProductIssue !== undefined) {
      if (this.productissue.description !== this.previousProductIssue.description) {
        const renameCommand = new ChangeDescriptionOfProductIssueCommand(this.productissue, this.product);
        this.service.postCommand(renameCommand, false);
        this.previousProductIssue.description = this.productissue.description;
      }
    } else {
      this.previousProductIssue = this.productissue;
    }
  }

  resolve(): void {
    if (this.previousProductIssue !== undefined) {
      if (this.productissue.resolvedVersionGuid !== this.previousProductIssue.resolvedVersionGuid) {
        const resolveCommand = new ResolveProductIssueCommand(this.productissue, this.product);
        this.service.postCommand(resolveCommand, false);
        this.previousProductIssue.description = this.productissue.description;
      }
    } else {
      this.previousProductIssue = this.productissue;
    }
  }
}
