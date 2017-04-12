import * as _ from 'lodash';

export class PropertyElementState {
    name: string;
    guid: string;
    description: string;
}

export class PropertyElement {
    private _state: PropertyElementState;

    constructor(state?: PropertyElementState) {
        this._state = state;
        if (!state) {
            this._state = new PropertyElementState();
        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get description(): string { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    public clone(): PropertyElement {
        return new PropertyElement(_.clone(this._state));
    }
}


