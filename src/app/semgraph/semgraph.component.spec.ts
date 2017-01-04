/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SemgraphComponent } from './semgraph.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SemgraphComponent', () => {
  let component: SemgraphComponent;
  let fixture: ComponentFixture<SemgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SemgraphComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
