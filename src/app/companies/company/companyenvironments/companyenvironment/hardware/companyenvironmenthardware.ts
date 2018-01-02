import * as _ from 'lodash';
export class CompanyEnvironmentHardwareItemState {
    guid: string;
    name: string;
    ipAddress: string;
    companyGuid: string;
    environmentGuid: string;
}
export class CompanyEnvironmentHardwareItem {
    private _state: CompanyEnvironmentHardwareItemState;
    constructor(state?: CompanyEnvironmentHardwareItemState) {
        this._state = state;
        if (!state) {
            this._state = new CompanyEnvironmentHardwareItemState();
        }
    }
    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get ipAddress(): string { return this._state.ipAddress; };
    set ipAddress(value: string) { this._state.ipAddress = value; };

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get companyGuid(): string { return this._state.companyGuid; };
    set companyGuid(value: string) { this._state.companyGuid = value; };

    get companyEnvironmentGuid(): string { return this._state.environmentGuid; };
    set companyEnvironmentGuid(value: string) { this._state.environmentGuid = value; };

    public clone(): CompanyEnvironmentHardwareItem {
        return new CompanyEnvironmentHardwareItem(_.clone(this._state));
    }
}
