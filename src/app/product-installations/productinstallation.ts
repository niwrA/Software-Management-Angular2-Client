import * as _ from 'lodash';
import { ProductState } from '../products/product';
export class ProductInstallationState {
    guid: string;
    companyGuid: string;
    companyEnvironmentGuid: string;
    productGuid: string;
    productVersionGuid: string;
    startDate: string;
    endDate: string;
    externalId: string;
    constructor() {
    }
}
export class ProductInstallation {
    private _state: ProductInstallationState;
    constructor(state?: ProductInstallationState) {
        this._state = state;
        if (!state) {
            this._state = new ProductInstallationState();
        }
    }
    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get companyGuid(): string { return this._state.companyGuid; };
    set companyGuid(value: string) { this._state.companyGuid = value; };

    get companyEnvironmentGuid(): string { return this._state.companyEnvironmentGuid; };
    set companyEnvironmentGuid(value: string) { this._state.companyEnvironmentGuid = value; };

    get productGuid(): string { return this._state.productGuid; };
    set productGuid(value: string) { this._state.productGuid = value; };

    get productVersionGuid(): string { return this._state.productVersionGuid; };
    set productVersionGuid(value: string) { this._state.productVersionGuid = value; };

    get startDate(): string { return this._state.startDate; };
    set startDate(value: string) { this._state.startDate = value; };

    get endDate(): string { return this._state.endDate; };
    set endDate(value: string) { this._state.endDate = value; };

    get externalId(): string { return this._state.externalId; };
    set externalId(value: string) { this._state.externalId = value; };

    public clone(): ProductInstallation {
        return new ProductInstallation(_.clone(this._state));
    }
}
