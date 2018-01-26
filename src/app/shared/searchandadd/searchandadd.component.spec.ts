import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchandaddComponent } from './searchandadd.component';

describe('SearchandaddComponent', () => {
  let component: SearchandaddComponent;
  let fixture: ComponentFixture<SearchandaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchandaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchandaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
