import { Component, Input, OnInit } from '@angular/core';
import { DesignsService } from './designs.service';
import { Design } from './design';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.css']
})
export class DesignsComponent implements OnInit {
  @Input() designs = new Array<Design>();
  @Input() canAdd: Boolean;
  selectedDesign: Design;
  searchText: string;

  constructor(private designsService: DesignsService) {
    this.designs = designsService.designs;
  }

  ngOnInit() {
    this.getDesigns();
  }

  onSelect(company: Design): void {
    this.selectedDesign = company;
  }

  clearSelection(): void {
    this.selectedDesign = null;
  }

  getDesigns(): void {
    this.designsService.getDesigns(this.searchText).then(designs => this.designs = designs);
  }

  createDesign(name: string): void {
    const design = this.designsService.createDesign(true, name);
    this.getDesigns();
  }

  deleteDesign(design: Design): void {
    this.designsService.deleteDesign(design);
    const index = this.designs.indexOf(design, 0);
    if (index > -1) {
      this.designs.splice(index, 1);
    }
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }
}
