import * as _ from 'lodash';

export class ProductIssueState {
    guid: string;
    productGuid: string;
    name: string;
    description?: string;
    isCritical: boolean;
    isSolved: boolean;
    firstVersionGuid?: string;
    firstVersionSequence?: number;
    lastVersionGuid?: string;
}

export class ProductIssue {
    private _state: ProductIssueState;
    private _firstVersionSequence: number;

    constructor(state?: ProductIssueState) {
        this._state = state;
        if (!state) {
            this._state = new ProductIssueState();
        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get description(): string { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    get isCritical(): boolean { return this._state.isCritical; };
    set isCritical(value: boolean) { this._state.isCritical = value; };

    get isSolved(): boolean { return this._state.isSolved; };
    set isSolved(value: boolean) { this._state.isSolved = value; };

    get productGuid(): string { return this._state.productGuid; };
    set productGuid(value: string) { this._state.productGuid = value; };

    get firstVersionGuid(): string { return this._state.firstVersionGuid; };
    set firstVersionGuid(value: string) { this._state.firstVersionGuid = value; };

    get firstVersionSequence(): number { return this._state.firstVersionSequence; };
    set firstVersionSequence(value: number) { this._state.firstVersionSequence = value; };

    get lastVersionGuid(): string { return this._state.lastVersionGuid; };
    set lastVersionGuid(value: string) { this._state.lastVersionGuid = value; };

    public clone(): ProductIssue {
        return new ProductIssue(_.clone(this._state));
    }
}
