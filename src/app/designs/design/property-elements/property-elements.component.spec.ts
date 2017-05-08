import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyElementsComponent } from './property-elements.component';

describe('PropertyELementsComponent', () => {
  let component: PropertyElementsComponent;
  let fixture: ComponentFixture<PropertyElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
