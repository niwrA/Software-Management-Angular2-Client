import * as _ from 'lodash';

export class CommandElementState {
    name: string;
    guid: string;
    designGuid: string;
    epicElementGuid: string;
    entityElementGuid: string;
    description: string;
}

export class CommandElement {
    private _state: CommandElementState;

    constructor(state?: CommandElementState) {
        this._state = state;
        if (!state) {
            this._state = new CommandElementState();
        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get designGuid(): string { return this._state.designGuid; };
    set designGuid(value: string) { this._state.designGuid = value; };

    get epicGuid(): string { return this._state.epicElementGuid; };
    set epicGuid(value: string) { this._state.epicElementGuid = value; };

    get entityGuid(): string { return this._state.entityElementGuid; };
    set entityGuid(value: string) { this._state.entityElementGuid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get description(): string { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    public clone(): CommandElement {
        return new CommandElement(_.clone(this._state));
    }
}


