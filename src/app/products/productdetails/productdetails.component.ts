import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { CommandsService } from '../../commands/commands.service';

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
    //    this.previousProduct = this.service.cloneProduct(newValue);
    this.product = newValue;
  }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getProduct(params['productId']))
      .subscribe((product: Product) => this.update(product));
  }

  changeName(): void {
    if (this.previousProduct !== undefined) {
      if (this.product.Name !== this.previousProduct.Name) {
        //      var renameCommand = new RenameProductCommand(this.product, this.previousProduct.Name);
        //      this.service.postCommand(renameCommand, false);
        this.previousProduct.Name = this.product.Name;
      }
    } else {
      this.previousProduct = this.product;
    }
  }
}
