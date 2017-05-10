import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyElementComponent } from './property-element.component';

describe('PropertyElementComponent', () => {
  let component: PropertyElementComponent;
  let fixture: ComponentFixture<PropertyElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
