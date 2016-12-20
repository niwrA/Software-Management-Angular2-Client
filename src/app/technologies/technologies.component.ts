import { Component, OnInit } from '@angular/core';
import { TechnologiesService } from './technologies.service';
import { Technology } from './technology';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css'],
  providers: [TechnologiesService]
})

export class TechnologiesComponent implements OnInit {
  technologies = new Array<Technology>();
  selectedTechnology: Technology;
  searchText: string;

  constructor(private technologiesService: TechnologiesService) { }

  ngOnInit() {
    this.getTechnologies('');
  }

  onSelect(technology: Technology): void {
    this.selectedTechnology = technology;
  }

  clearSelection(): void {
    this.selectedTechnology = null;
  }

  TechnologyDetail(event, Technology: Technology): void {
/*    event.stopPropagation();
    this.router.navigate(['/Technology', Technology.Guid]);
*/  }

  getTechnologies(searchText: string): void {
    this.technologiesService.getTechnologies(searchText).then(technologies => this.technologies = technologies);
  }

  createTechnology(name: string): void {
    let technology = this.technologiesService.createTechnology();
    technology.Name = name;
    this.searchText = '';
    this.getTechnologies('');
  }
}

