import * as _ from 'lodash';

export class EpicElementState {
    name: string;
    guid: string;
    description: string;
}

export class EpicElement {
    private _state: EpicElementState;

    constructor(state?: EpicElementState) {
        this._state = state;
        if (!state) {
            this._state = new EpicElementState();
        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get description(): string { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    public clone(): EpicElement {
        return new EpicElement(_.clone(this._state));
    }
}


