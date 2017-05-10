import { Injectable, Directive, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute, Params, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class ActivatedRouteStub extends ActivatedRoute {

    // ActivatedRoute.params is Observable
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    // Test parameters
    private _testParams: {};
    get testParams() { return this._testParams; }
    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }

    // ActivatedRoute.snapshot.params
    get snapshot() {
        const snapshot = new ActivatedRouteSnapshot();
        snapshot.params = this.testParams;
        return snapshot;
    }
    // ActivatedRoute.parent.params
    get parent() {
        const route = new ActivatedRoute();
        route.params =  this.subject.asObservable();
        return route;
    }
}

@Directive({
    selector: '[routerLink]',
    host: {
        '(click)': 'onClick()'
    }
})

export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

export class RouterStub {
    navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> { return; }
    navigateByUrl(url: string) { return url; }
}