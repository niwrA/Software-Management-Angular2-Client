import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { CommandsService } from '../../commands/commands.service';
import { RenameProductCommand, ChangeDescriptionOfProductCommand, ChangeBusinessCaseOfProductCommand } from '../product/product.commands';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  previousProduct: Product;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService,
    private commandsService: CommandsService
  ) { }

  update(newValue) {
    this.previousProduct = this.service.cloneProduct(newValue);
    this.product = newValue;
  }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getProduct(params['productId']))
      .subscribe((product: Product) => this.update(product));
  }

  changeName(): void {
    if (this.previousProduct !== undefined) {
      if (this.product.name !== this.previousProduct.name) {
        const renameCommand = new RenameProductCommand(this.product, this.previousProduct.name);
        this.service.postCommand(renameCommand, false);
        this.previousProduct.name = this.product.name;
      }
    } else {
      this.previousProduct = this.product;
    }
  }

  changeDescription(): void {
    if (this.previousProduct !== undefined) {
      if (this.product.description !== this.previousProduct.description) {
        const command = new ChangeDescriptionOfProductCommand(this.product);
        this.service.postCommand(command, false);
        this.previousProduct.description = this.product.description;
      }
    } else {
      this.previousProduct = this.product;
    }
  }

  changeBusinessCase(): void {
    if (this.previousProduct !== undefined) {
      if (this.product.businessCase !== this.previousProduct.businessCase) {
        const command = new ChangeBusinessCaseOfProductCommand(this.product);
        this.service.postCommand(command, false);
        this.previousProduct.businessCase = this.product.businessCase;
      }
    } else {
      this.previousProduct = this.product;
    }
  }

}
