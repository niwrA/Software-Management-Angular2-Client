import * as _ from 'lodash';
import { EpicElement, EpicElementState } from './design/epic-elements/epic-element';

export class DesignState {
    name: string;
    guid: string;
    description: string;
    epicElements: Array<EpicElementState>;
}

export class Design {
    private _state: DesignState;
    epics: Array<EpicElement>;
    constructor(state?: DesignState) {
        this.epics = new Array<EpicElement>();
        this._state = state;
        if (!state) {
            this._state = new DesignState();
        } else {
            if (state.epicElements && state.epicElements.length > 0) {
                for (let i = 0; i < state.epicElements.length; i++) {
                    this.epics.push(new EpicElement(state.epicElements[i]));
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

    public clone(): Design {
        return new Design(_.clone(this._state));
    }
}


