
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductInstallation } from '../productinstallation';
import { ProductInstallationsService } from '../product-installations.service';

@Component({
  selector: 'app-product-installation',
  templateUrl: './product-installation.component.html',
  styleUrls: ['./product-installation.component.css']
})
export class ProductInstallationComponent implements OnInit {

  productinstallation: ProductInstallation;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductInstallationsService
  ) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.service.getProductInstallation(params['productInstallationId']))
      .subscribe((productinstallation: ProductInstallation) => this.productinstallation = productinstallation);
  }

}
