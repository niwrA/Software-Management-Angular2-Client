import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchandadd',
  templateUrl: './searchandadd.component.html',
  styleUrls: ['./searchandadd.component.css']
})
export class SearchandaddComponent implements OnInit {
  @Input() public searchText: string;
  @Output() onFilter: EventEmitter<any> = new EventEmitter();
  @Output() onCreate: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  filterHandler(searchText): void {
    this.onFilter.emit(searchText);
  }
  createHandler(name): void {
    this.onCreate.emit(name);
  }
}
