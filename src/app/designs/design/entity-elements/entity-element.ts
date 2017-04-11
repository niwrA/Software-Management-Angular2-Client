import * as _ from 'lodash';

export class EntityElementState {
    name: string;
    guid: string;
    description: string;
}

export class EntityElement {
    private _state: EntityElementState;

    constructor(state?: EntityElementState) {
        this._state = state;
        if (!state) {
            this._state = new EntityElementState();
        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get description(): string { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    public clone(): EntityElement {
        return new EntityElement(_.clone(this._state));
    }
}


