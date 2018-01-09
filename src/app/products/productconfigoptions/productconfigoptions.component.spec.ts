import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfigOptionsComponent } from './productconfigoptions.component';

describe('ProductConfigOptionsComponent', () => {
  let component: ProductConfigOptionsComponent;
  let fixture: ComponentFixture<ProductConfigOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductConfigOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
