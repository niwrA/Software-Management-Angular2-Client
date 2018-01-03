import * as _ from 'lodash';
import { CompanyEnvironmentHardwareItemState, CompanyEnvironmentHardwareItem } from './companyenvironment/hardware/companyenvironmenthardware';
import { DatabaseState, Database } from './companyenvironment/databases/database';
import { AccountState, Account } from './companyenvironment/accounts/account';
export class CompanyEnvironmentState {
    guid: string;
    name: string;
    url: string;
    companyGuid: string;
    hardware: Array<CompanyEnvironmentHardwareItemState>;
    databases: Array<DatabaseState>;
    accounts: Array<AccountState>;
    constructor() {
        this.hardware = new Array<CompanyEnvironmentHardwareItemState>();
        this.databases = new Array<DatabaseState>();
        this.accounts = new Array<AccountState>();
    }
}
export class CompanyEnvironment {
    private _state: CompanyEnvironmentState;
    hardware: Array<CompanyEnvironmentHardwareItem>;
    databases: Array<Database>;
    accounts: Array<Account>;
    constructor(state?: CompanyEnvironmentState) {
        this._state = state;
        if (!this.hardware) {
            this.hardware = new Array<CompanyEnvironmentHardwareItem>();
        }
        if (!this.databases) {
            this.databases = new Array<Database>();
        }
        if (!this.accounts) {
            this.accounts = new Array<Account>();
        }
        if (!state) {
            this._state = new CompanyEnvironmentState();
        } else {
            if (state.hardware && state.hardware.length > 0) {
                for (const hardwareState of state.hardware) {
                    this.hardware.push(new CompanyEnvironmentHardwareItem(hardwareState));
                }
            }
            if (state.databases && state.databases.length > 0) {
                for (const databaseState of state.databases) {
                    this.databases.push(new Database(databaseState));
                }
            }
            if (state.accounts && state.accounts.length > 0) {
                for (const accountState of state.accounts) {
                    this.accounts.push(new Account(accountState));
                }
            }
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
