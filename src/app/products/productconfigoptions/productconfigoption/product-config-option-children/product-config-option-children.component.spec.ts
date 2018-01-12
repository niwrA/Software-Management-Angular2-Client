import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfigOptionChildrenComponent } from './product-config-option-children.component';

describe('ProductConfigOptionChildrenComponent', () => {
  let component: ProductConfigOptionChildrenComponent;
  let fixture: ComponentFixture<ProductConfigOptionChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductConfigOptionChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigOptionChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
