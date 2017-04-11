import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityElementDetailsComponent } from './entity-element-details.component';

describe('EntityElementDetailsComponent', () => {
  let component: EntityElementDetailsComponent;
  let fixture: ComponentFixture<EntityElementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityElementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityElementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
