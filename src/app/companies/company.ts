import * as _ from 'lodash';
export class CompanyState {
    name: string;
    guid: string;
}
export class Company {
    private _state: CompanyState;
    constructor(state?: CompanyState) {
        this._state = state;
        if (!state) {
            this._state = new CompanyState();
        }
    }
    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    public clone(): Company {
        return new Company(_.clone(this._state));
    }
}

