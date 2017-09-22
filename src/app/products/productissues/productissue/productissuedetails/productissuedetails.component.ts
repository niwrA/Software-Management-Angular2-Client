import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductIssue } from '../../productissue';
import { ProductsService } from '../../../products.service';
import { RenameProductIssueCommand, ChangeDescriptionOfProductIssueCommand } from '../../../product/product.commands';
@Component({
  selector: 'app-productissuedetails',
  templateUrl: './productissuedetails.component.html',
  styleUrls: ['./productissuedetails.component.css']
})
export class ProductIssueDetailsComponent implements OnInit {
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
      this.service.getProductIssue(productId, issueId).then(productIssue => this.update(productIssue));
    }
  }

  changeName(): void {
    if (this.previousProductIssue !== undefined) {
      if (this.productissue.name !== this.previousProductIssue.name) {
        const renameCommand = new RenameProductIssueCommand(this.productissue, this.previousProductIssue.name);
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
        const renameCommand = new ChangeDescriptionOfProductIssueCommand(this.productissue);
        this.service.postCommand(renameCommand, false);
        this.previousProductIssue.description = this.productissue.description;
      }
    } else {
      this.previousProductIssue = this.productissue;
    }
  }

}
