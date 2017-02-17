/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivatedRouteStub } from 'testing/router-stubs';

import { ContactDetailsComponent } from './contactdetails.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContactsService } from '../../contacts.service';
import { ContactsServiceStub } from '../../mock-contacts';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'contacts/:contactId', component: ContactDetailsComponent }])],
      declarations: [ContactDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ContactsService, useClass: ContactsServiceStub }, {provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.testParams = { contactId: 'contact11' };
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
