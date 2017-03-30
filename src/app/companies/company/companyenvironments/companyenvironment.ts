import * as _ from 'lodash';
export class CompanyEnvironmentState {
    guid: string;
    name: string;
    url: string;
    companyGuid: string;
}
export class CompanyEnvironment {
    private _state: CompanyEnvironmentState;
    constructor(state?: CompanyEnvironmentState) {
        this._state = state;
        if (!state) {
            this._state = new CompanyEnvironmentState();
        }
    }
    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get url(): string { return this._state.url; };
    set url(value: string) { this._state.url = value; };

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get companyGuid(): string { return this._state.companyGuid; };
    set companyGuid(value: string) { this._state.companyGuid = value; };

    public clone(): CompanyEnvironment {
        return new CompanyEnvironment(_.clone(this._state));
    }
}
