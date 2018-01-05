import { UUID } from 'angular2-uuid';
import { SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'lodash';
export class CommandState {
    guid: string;
    name: string;
    entity: string;
    entityGuid: string;
    parametersJson: string;
    createdOn: string;
    executedOn?: string;
    userName?: string;
}
export class CommandReadOnly {
    _state: CommandState;
    _embeddedUrl: SafeResourceUrl;
    constructor(state?: CommandState) {
        this._state = state;
        if (!state) {
            this._state = new CommandState();
        }
    }

    get guid() { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name() { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get parametersJson() { return this._state.parametersJson; };
    set parametersJson(value: string) { this._state.parametersJson = value; };

    get entity() { return this._state.entity; };
    set entity(value: string) { this._state.entity = value; };

    get createdOn() { return this._state.createdOn; };
    set createdOn(value: string) { this._state.createdOn = value; };

    get executedOn() { return this._state.executedOn; };
    set executedOn(value: string) { this._state.executedOn = value; };

    get userName() { return this._state.userName; };
    set userName(value: string) { this._state.userName = value; };

    get forGuid() { return this._state.entityGuid; };
    set forGuid(value: string) { this._state.entityGuid = value; };

    public clone(): CommandReadOnly {
        return new CommandReadOnly(_.clone(this._state));
    }
}

export class Command {
    Name: string;
    Guid: string;
    Entity: string;
    EntityGuid: string;
    CreatedOn: string;
    ParametersJson?: string;
    Parameters?: CommandParameters;
    DisplayProperties: CommandDisplayProperties;
    constructor(type: string, entityName: string, entityGuid: string) {
        const now = new Date();
        this.Guid = UUID.UUID();
        this.Name = type;
        this.Entity = entityName;
        this.EntityGuid = entityGuid;
        this.CreatedOn = now.toDateString();
        this.DisplayProperties = new CommandDisplayProperties();
        this.DisplayProperties.title = this.Name + ' ' + this.Entity;
        this.DisplayProperties.description = this.CreatedOn.toString();
    }
}

export class CommandParameters {

}
export class CommandDisplayProperties {
    title: string;
    description: string;
}
