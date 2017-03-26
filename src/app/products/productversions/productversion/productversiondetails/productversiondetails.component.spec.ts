import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductversiondetailsComponent } from './productversiondetails.component';

describe('ProductversiondetailsComponent', () => {
  let component: ProductversiondetailsComponent;
  let fixture: ComponentFixture<ProductversiondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductversiondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductversiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
