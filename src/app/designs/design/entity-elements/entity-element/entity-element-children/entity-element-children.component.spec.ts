import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityElementChildrenComponent } from './entity-element-children.component';

describe('EntityElementChildrenComponent', () => {
  let component: EntityElementChildrenComponent;
  let fixture: ComponentFixture<EntityElementChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityElementChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityElementChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
