import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVersionDetailsComponent } from './productversiondetails.component';

describe('ProductVersionDetailsComponent', () => {
  let component: ProductVersionDetailsComponent;
  let fixture: ComponentFixture<ProductVersionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVersionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVersionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
