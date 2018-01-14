import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CompaniesService } from '../companies/companies.service';
import { CompaniesSelectComponent } from '../companies/companies-select/companies-select.component';

@Component({
  selector: 'app-product-installations',
  templateUrl: './product-installations.component.html',
  styleUrls: ['./product-installations.component.css']
})
export class ProductInstallationsComponent implements OnInit {
  companyDialogRef: MatDialogRef<CompaniesSelectComponent>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    //    private service: ProjectRoleAssignmentsService,
    private dialog: MatDialog,
    private companiesService: CompaniesService
    //private projectsService: ProjectsService
  ) {
  }


  ngOnInit() {
  }
  openCompaniesDialog() {
    this.companyDialogRef = this.dialog.open(CompaniesSelectComponent/*, {
      height: '400px',
      width: '600px',
    }*/);
    this.companyDialogRef.afterClosed().subscribe(test => this.handleSelected(test));
  }

  handleSelected(ref) {
    const selectedCompanies = this.companyDialogRef.componentInstance.selectedCompanies;
    //const projectroleassignments = new Array<ProjectRoleAssignment>();
    for (const selected of selectedCompanies) {
      //const exist = _.find(this.projectroleassignments, projectroleassignment => projectroleassignment.companyGuid === selected.guid);
      // if (!exist) {
      //   const projectroleassignment = this.service.createProjectRoleAssignment(true, selected.guid, this.project.guid,
      //     this.projectroleguid, false, selected.name);
      //   this.projectroleassignments.push(projectroleassignment);
      //   projectroleassignments.push(projectroleassignment);
    }
    // this.service.postProjectRoleAssignments(projectroleassignments);
  }

}
