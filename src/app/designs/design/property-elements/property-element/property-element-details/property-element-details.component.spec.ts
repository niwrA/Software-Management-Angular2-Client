import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyElementDetailsComponent } from './property-element-details.component';

describe('PropertyElementDetailsComponent', () => {
  let component: PropertyElementDetailsComponent;
  let fixture: ComponentFixture<PropertyElementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyElementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyElementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
