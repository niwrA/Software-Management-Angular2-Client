import * as _ from 'lodash';
export class CompanyRoleState {
    guid: string;
    name: string;
    companyGuid: string;
}
export class CompanyRole {
    private _state: CompanyRoleState;
    constructor(state?: CompanyRoleState) {
        this._state = state;
        if (!state) {
            this._state = new CompanyRoleState();
        }
    }
    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get companyGuid(): string { return this._state.companyGuid; };
    set companyGuid(value: string) { this._state.companyGuid = value; };

    public clone(): CompanyRole {
        return new CompanyRole(_.clone(this._state));
    }
}
