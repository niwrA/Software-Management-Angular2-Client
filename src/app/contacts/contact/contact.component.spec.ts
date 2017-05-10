/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContactComponent } from './contact.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivatedRouteStub } from 'testing/router-stubs';
import { ContactsService } from '../contacts.service';
import { ContactsServiceStub } from '../mock-contacts';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let activatedRoute: any; // todo: cleanup

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([{ path: 'contacts/:contactId', component: ContactComponent }])],
      providers: [{ provide: ContactsService, useClass: ContactsServiceStub }, { provide: ActivatedRoute, useClass: ActivatedRouteStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.testParams = { contactId: 'contact11' };
    fixture.detectChanges();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
