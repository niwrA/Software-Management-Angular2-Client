import * as _ from 'lodash';

export class DesignElementState {
    name: string;
    guid: string;
    type: string;
    designGuid: string;
    children: Array<DesignElementState>;
}

export class DesignElement {
    private _state: DesignElementState;
    children: Array<DesignElement>;

    constructor(state?: DesignElementState) {
        this._state = state;
        if (!state) {
            this._state = new DesignElementState();
        }
        if (state.children) {
            if (state.children && state.children.length > 0) {
                for (let i = 0; i < state.children.length; i++) {
                    this.children.push(new DesignElement(state.children[i]));
                }
            }

        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get type(): string { return this._state.type; };
    set type(value: string) { this._state.type = value; };

    get designGuid(): string { return this._state.designGuid; };
    set designGuid(value: string) { this._state.designGuid = value; };

    public clone(): DesignElement {
        return new DesignElement(_.clone(this._state));
    }
}


