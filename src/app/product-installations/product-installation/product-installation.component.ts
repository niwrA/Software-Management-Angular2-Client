
import {switchMap} from 'rxjs/operators';


import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductInstallation } from '../productinstallation';
import { ProductInstallationsService } from '../product-installations.service';
import { NavLink } from '../../shared/appnavbar/navlink';

@Component({
  selector: 'app-product-installation',
  templateUrl: './product-installation.component.html',
  styleUrls: ['./product-installation.component.css']
})
export class ProductInstallationComponent implements OnInit {

  productinstallation: ProductInstallation;
  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
    new NavLink('links', 'Links', false),
    new NavLink('files', 'Files', false),
    new NavLink('commands', 'Audit', false)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductInstallationsService
  ) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.service.getProductInstallation(params['productInstallationId'])))
      .subscribe((productinstallation: ProductInstallation) => this.productinstallation = productinstallation);
  }

}
