import * as _ from 'lodash';
import { PropertyElement, PropertyElementState } from '../property-elements/property-element';
export class EntityElementState {
    name: string;
    guid: string;
    description: string;
    properties: Array<PropertyElementState>;
}

export class EntityElement {
    private _state: EntityElementState;
    properties: Array<PropertyElement>;

    constructor(state?: EntityElementState) {
        this._state = state;
        this.properties = new Array<PropertyElement>();

        if (!state) {
            this._state = new EntityElementState();
        } else {
            if (state.properties && state.properties.length > 0) {
                for (let i = 0; i < state.properties.length; i++) {
                    this.properties.push(new PropertyElement(state.properties[i]));
                }
            }
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
