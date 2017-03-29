import { CompanyRole, CompanyRoleState } from './company/companyroles/companyrole';
import { CompanyEnvironment, CompanyEnvironmentState } from './company/companyenvironments/companyenvironment';
import * as _ from 'lodash';
export class CompanyState {
    name: string;
    guid: string;
    roles: Array<CompanyRoleState>;
    environments: Array<CompanyEnvironmentState>;

    constructor() {
        this.roles = new Array<CompanyRoleState>();
        this.environments = new Array<CompanyEnvironmentState>();
    }
}
export class Company {
    private _state: CompanyState;
    roles: Array<CompanyRole>;
    environments: Array<CompanyEnvironment>;

    constructor(state?: CompanyState) {
        if (!state) {
            state = new CompanyState();
        }
        if (!this.roles) {
            this.roles = new Array<CompanyRole>();
        }
        for (const companyRoleState of state.roles) {
            this.roles.push(new CompanyRole(companyRoleState));
        }
        if (!this.environments) {
            this.environments = new Array<CompanyEnvironment>();
        }
        for (const environmentState of state.environments) {
            this.environments.push(new CompanyEnvironment(environmentState));
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

