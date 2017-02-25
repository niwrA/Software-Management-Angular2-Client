import { CompanyRole, CompanyRoleState } from './company/companyroles/companyrole';
import * as _ from 'lodash';
export class CompanyState {
    constructor() {
        this.companyRoles = new Array<CompanyRoleState>();
    }
    name: string;
    guid: string;
    companyRoles: Array<CompanyRoleState>;
}
export class Company {
    private _state: CompanyState;
    companyRoles: Array<CompanyRole>;
    constructor(state?: CompanyState) {
        if (!state) {
            state = new CompanyState();
        }
        if (!this.companyRoles) {
            this.companyRoles = new Array<CompanyRole>();
        }
        for (const companyRoleState of state.companyRoles) {
            this.companyRoles.push(new CompanyRole(companyRoleState));
        }
        this._state = state;
    }

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    public clone(): Company {
        return new Company(_.clone(this._state));
    }
}

