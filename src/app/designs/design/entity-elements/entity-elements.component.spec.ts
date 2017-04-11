import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityElementsComponent } from './entity-elements.component';

describe('EntityElementsComponent', () => {
  let component: EntityElementsComponent;
  let fixture: ComponentFixture<EntityElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
