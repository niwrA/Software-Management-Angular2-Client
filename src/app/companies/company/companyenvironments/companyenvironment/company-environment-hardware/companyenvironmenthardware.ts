import * as _ from 'lodash';
export class CompanyEnvironmentHardwareState {
    guid: string;
    name: string;
    url: string;
    companyGuid: string;
    environmentGuid: string;
}
export class CompanyEnvironmentHardware {
    private _state: CompanyEnvironmentHardwareState;
    constructor(state?: CompanyEnvironmentHardwareState) {
        this._state = state;
        if (!state) {
            this._state = new CompanyEnvironmentHardwareState();
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

    get companyEnvironmentGuid(): string { return this._state.environmentGuid; };
    set companyEnvironmentGuid(value: string) { this._state.environmentGuid = value; };

    public clone(): CompanyEnvironmentHardware {
        return new CompanyEnvironmentHardware(_.clone(this._state));
    }
}
