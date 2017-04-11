import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyELementComponent } from './property-element.component';

describe('PropertyELementComponent', () => {
  let component: PropertyELementComponent;
  let fixture: ComponentFixture<PropertyELementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyELementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyELementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
