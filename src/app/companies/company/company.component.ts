
import {switchMap} from 'rxjs/operators';

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Company } from '../company';
import { CompaniesService } from '../companies.service';
import { NavLink } from '../../shared/appnavbar/navlink';
import { Output } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company: Company;
  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
    new NavLink('roles', 'Roles', false),
    new NavLink('environments', 'Environments', false),
    new NavLink('links', 'Links', false),
    new NavLink('files', 'Files', false),
    new NavLink('commands', 'Audit', false)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService
  ) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.service.getCompany(params['companyId'])))
      .subscribe((company: Company) => this.company = company);
  }

}
