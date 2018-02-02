import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { NavLink } from '../../shared/appnavbar/navlink';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product;
  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
    new NavLink('versions', 'Versions', false),
    new NavLink('features', 'Features', false),
    new NavLink('issues', 'Issues', false),
    new NavLink('configoptions', 'Config Options', false),
    new NavLink('links', 'Links', false),
    new NavLink('files', 'Files', false),
    new NavLink('commands', 'Audit', false)
  );
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.service.getProduct(params['productId']))
    .subscribe((product: Product) => this.product = product);
  }
}