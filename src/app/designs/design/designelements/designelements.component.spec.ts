import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignelementsComponent } from './designelements.component';

describe('DesignelementsComponent', () => {
  let component: DesignelementsComponent;
  let fixture: ComponentFixture<DesignelementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignelementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignelementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
