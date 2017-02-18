import { Injectable, Directive, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavigationExtras } from '@angular/router';

@Injectable()
export class ActivatedRouteStub {

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
        return { params: this.testParams };
    }
        // ActivatedRoute.parent.params
    get parent() {
        return { params: this.subject.asObservable() };
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
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> { return ; }
  navigateByUrl(url: string) { return url; }
}