import * as _ from 'lodash';
import { CompanyEnvironmentHardwareItemState, CompanyEnvironmentHardwareItem } from './companyenvironment/hardware/companyenvironmenthardware';
export class CompanyEnvironmentState {
    guid: string;
    name: string;
    url: string;
    companyGuid: string;
    hardware: Array<CompanyEnvironmentHardwareItemState>;
    constructor() {
        this.hardware = new Array<CompanyEnvironmentHardwareItemState>();
    }
}
export class CompanyEnvironment {
    private _state: CompanyEnvironmentState;
    hardware: Array<CompanyEnvironmentHardwareItem>;
    constructor(state?: CompanyEnvironmentState) {
        this._state = state;
        if (!this.hardware) {
            this.hardware = new Array<CompanyEnvironmentHardwareItem>();
        }
        if (!state) {
            this._state = new CompanyEnvironmentState();
        } else {
            if (state.hardware && state.hardware.length > 0) {
                for (const hardwareState of state.hardware) {
                    this.hardware.push(new CompanyEnvironmentHardwareItem(hardwareState));
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
