import { ProductVersion, ProductVersionState } from './productversions/productversion';
import * as _ from 'lodash';

export class ProductState {
    name: string;
    guid: string;
    description: string;
    businessCase: string;
    versions: Array<ProductVersionState>;
}

export class Product {
    private _state: ProductState;
    versions: Array<ProductVersion>;

    constructor(state?: ProductState) {
        this._state = state;
        this.versions = new Array<ProductVersion>();
        if (!state) {
            this._state = new ProductState();
        } else {
            if (state.versions && state.versions.length > 0) {
                for (let i = 0; i < state.versions.length; i++) {
                    this.versions.push(new ProductVersion(state.versions[i]));
                }
            }
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

    // get versions(): Array<ProductVersion> { return this._versions; };
    // set versions(value: Array<ProductVersion>) { this._versions = value; };

    public clone(): Product {
        return new Product(_.clone(this._state));
    }
}


