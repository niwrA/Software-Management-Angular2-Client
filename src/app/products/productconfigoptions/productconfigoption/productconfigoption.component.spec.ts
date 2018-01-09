import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfigOptionComponent } from './productconfigoption.component';

describe('ProductConfigOptionComponent', () => {
  let component: ProductConfigOptionComponent;
  let fixture: ComponentFixture<ProductConfigOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductConfigOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
