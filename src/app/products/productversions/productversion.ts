import * as _ from 'lodash';
export class ProductVersionState {
    name: string;
    guid: string;
    major: number;
    minor: number;
    revision: number;
    build: number;
    releaseDate?: string;
    productGuid: string;
}

export class ProductVersion {

    private _state: ProductVersionState;
    constructor(state?: ProductVersionState) {
        this._state = state;
        if (!state) {
            this._state = new ProductVersionState();
        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get major(): number { return this._state.major; };
    set major(value: number) { this._state.major = value; };

    get minor(): number { return this._state.minor; };
    set minor(value: number) { this._state.minor = value; };

    get revision(): number { return this._state.revision; };
    set revision(value: number) { this._state.revision = value; };

    get build(): number { return this._state.build; };
    set build(value: number) { this._state.build = value; };

    get releaseDate(): string { return this._state.releaseDate; };
    set releaseDate(value: string) { this._state.releaseDate = value; };

    get productGuid(): string { return this._state.productGuid; };
    set productGuid(value: string) { this._state.productGuid = value; };

    public clone(): ProductVersion {
        return new ProductVersion(_.clone(this._state));
    }
}
