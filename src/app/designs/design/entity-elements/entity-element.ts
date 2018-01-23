import * as _ from 'lodash';
import { PropertyElement, PropertyElementState } from '../property-elements/property-element';
import { CommandElement, CommandElementState } from '../command-elements/command-element';
export class EntityElementState {
    name: string;
    guid: string;
    designGuid: string;
    parentGuid: string;
    epicElementGuid: string;
    description: string;
    propertyElements: Array<PropertyElementState>;
    commandElements: Array<CommandElementState>;
}

export class EntityElement {
    private _state: EntityElementState;
    properties: Array<PropertyElement>;
    commands: Array<CommandElement>;

    constructor(state?: EntityElementState) {
        this._state = state;
        this.properties = new Array<PropertyElement>();
        this.commands = new Array<CommandElement>();

        if (!state) {
            this._state = new EntityElementState();
        } else {
            if (state.propertyElements && state.propertyElements.length > 0) {
                for (let i = 0; i < state.propertyElements.length; i++) {
                    this.properties.push(new PropertyElement(state.propertyElements[i]));
                }
            }
            if (state.commandElements && state.commandElements.length > 0) {
                for (let i = 0; i < state.commandElements.length; i++) {
                    this.commands.push(new CommandElement(state.commandElements[i]));
                }
            }
        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get parentGuid(): string { return this._state.parentGuid; };
    set parentGuid(value: string) { this._state.parentGuid = value; };

    get designGuid(): string { return this._state.designGuid; };
    set designGuid(value: string) { this._state.designGuid = value; };

    get epicGuid(): string { return this._state.epicElementGuid; };
    set epicGuid(value: string) { this._state.epicElementGuid = value; };

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get description(): string { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    public clone(): EntityElement {
        return new EntityElement(_.clone(this._state));
    }
}
