import * as _ from 'lodash';
export class ProductConfigOptionState {
    name: string;
    description: string;
    defaultValue: string;
    path: string;
    guid: string;
    parentGuid: string;
    productGuid: string;
    productFeatureGuid: string;
    isOptionForParent: boolean;
    isDefaultOption: boolean;
}

export class ProductConfigOption {

    private _state: ProductConfigOptionState;
    private _sequence: number;
    constructor(state?: ProductConfigOptionState) {
        this._state = state;
        if (!state) {
            this._state = new ProductConfigOptionState();
        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get description(): string { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    get path(): string { return this._state.path; };
    set path(value: string) { this._state.path = value; };

    get defaultValue(): string { return this._state.defaultValue; };
    set defaultValue(value: string) { this._state.defaultValue = value; };

    get productGuid(): string { return this._state.productGuid; };
    set productGuid(value: string) { this._state.productGuid = value; };

    get productFeatureGuid(): string { return this._state.productFeatureGuid; };
    set productFeatureGuid(value: string) { this._state.productFeatureGuid = value; };

    get parentGuid(): string { return this._state.parentGuid; };
    set parentGuid(value: string) { this._state.parentGuid = value; };

    get isOptionForParent(): boolean { return this._state.isOptionForParent; };
    set isOptionForParent(value: boolean) { this._state.isOptionForParent = value; };

    get isDefaultOption(): boolean { return this._state.isDefaultOption; };
    set isDefaultOption(value: boolean) { this._state.isDefaultOption = value; };

    public clone(): ProductConfigOption {
        return new ProductConfigOption(_.clone(this._state));
    }
}
