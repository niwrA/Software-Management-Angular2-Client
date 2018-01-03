import * as _ from 'lodash';
export class AccountState {
    guid: string;
    name: string;
    companyGuid: string;
    environmentGuid: string;
}
export class Account {
    private _state: AccountState;
    constructor(state?: AccountState) {
        this._state = state;
        if (!state) {
            this._state = new AccountState();
        }
    }
    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get companyGuid(): string { return this._state.companyGuid; };
    set companyGuid(value: string) { this._state.companyGuid = value; };

    get companyEnvironmentGuid(): string { return this._state.environmentGuid; };
    set companyEnvironmentGuid(value: string) { this._state.environmentGuid = value; };

    public clone(): Account {
        return new Account(_.clone(this._state));
    }
}
