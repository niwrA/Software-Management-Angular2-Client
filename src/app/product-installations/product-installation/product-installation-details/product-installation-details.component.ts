import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductInstallation } from '../../productinstallation';
import { ChangeEndDateOfProductInstallationCommand, ChangeStartDateOfProductInstallationCommand } from '../product-installation.commands';
import { ProductInstallationsService } from '../../product-installations.service';

@Component({
  selector: 'app-product-installation-details',
  templateUrl: './product-installation-details.component.html',
  styleUrls: ['./product-installation-details.component.css']
})
export class ProductInstallationDetailsComponent implements OnInit {
  productinstallation: ProductInstallation;
  previousProductInstallation: ProductInstallation;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductInstallationsService
  ) { }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getProductInstallation(params['productInstallationId']))
      .subscribe((productinstallation: ProductInstallation) => this.update(productinstallation));
  }

  update(newValue) {
    if (newValue) {
      this.previousProductInstallation = this.service.cloneProductInstallation(newValue);
      this.productinstallation = newValue;
    }
  }

  changeStartDate(): void {
    if (this.previousProductInstallation !== undefined) {
      if (this.productinstallation.startDate !== this.previousProductInstallation.startDate) {
        const renameCommand = new ChangeStartDateOfProductInstallationCommand
          (this.productinstallation, this.previousProductInstallation.startDate);
        this.service.postCommand(renameCommand, false);
        this.previousProductInstallation.startDate = this.productinstallation.startDate;
      }
    } else {
      this.previousProductInstallation = this.productinstallation;
    }
  }

  changeEndDate(): void {
    if (this.previousProductInstallation !== undefined) {
      if (this.productinstallation.endDate !== this.previousProductInstallation.endDate) {
        const renameCommand = new ChangeStartDateOfProductInstallationCommand
          (this.productinstallation, this.previousProductInstallation.endDate);
        this.service.postCommand(renameCommand, false);
        this.previousProductInstallation.endDate = this.productinstallation.endDate;
      }
    } else {
      this.previousProductInstallation = this.productinstallation;
    }
  }
}
