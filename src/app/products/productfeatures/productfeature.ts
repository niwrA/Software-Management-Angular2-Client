import * as _ from 'lodash';

export class ProductFeatureState {
    guid: string;
    productGuid: string;
    name: string;
    description?: string;
    isRequest?: boolean;
}

export class ProductFeature {
    private _state: ProductFeatureState;

    constructor(state?: ProductFeatureState) {
        this._state = state;
        if (!state) {
            this._state = new ProductFeatureState();
        } 
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get description(): string { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    get isRequest(): boolean { return this._state.isRequest; };
    set isRequest(value: boolean) { this._state.isRequest = value; };

    get productGuid(): string { return this._state.productGuid; };
    set productGuid(value: string) { this._state.productGuid = value; };

    public clone(): ProductFeature {
        return new ProductFeature(_.clone(this._state));
    }
}