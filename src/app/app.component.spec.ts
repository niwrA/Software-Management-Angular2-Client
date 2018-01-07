/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivatedRouteStub } from 'testing/router-stubs';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'home', component: AppComponent }])],
      declarations: [
        AppComponent
      ], schemas: [NO_ERRORS_SCHEMA],
      providers: [RouterTestingModule]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have correct title'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Software Management');
  }));

  it('should render title in an mat-card-title tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('Software Management');
  }));
});
