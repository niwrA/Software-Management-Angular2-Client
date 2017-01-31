import * as _ from 'lodash';
export class ProductState {
    name: string;
    guid: string;
    description: string;
    businessCase: string;
}

export class Product {
    private _state: ProductState;
    constructor(state?: ProductState) {
        this._state = state;
        if (!state) {
            this._state = new ProductState();
        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get description(): string { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    get businessCase(): string { return this._state.businessCase; };
    set businessCase(value: string) { this._state.businessCase = value; };

    public clone(): Product {
        return new Product(_.clone(this._state));
    }
}


