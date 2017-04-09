import * as _ from 'lodash';

export class DesignState {
    name: string;
    guid: string;
    description: string;
}

export class Design {
    private _state: DesignState;

    constructor(state?: DesignState) {
        this._state = state;
        if (!state) {
            this._state = new DesignState();
        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get description(): string { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    public clone(): Design {
        return new Design(_.clone(this._state));
    }
}


