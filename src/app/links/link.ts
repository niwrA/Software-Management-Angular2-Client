import * as _ from 'lodash';
export class LinkState {
    guid: string;
    name: string;
    forGuid: string;
    url: string;
}
export class SelectableItem {
    isSelected: boolean;
}
export class Link extends SelectableItem {
    _state: LinkState;
    constructor(state?: LinkState) {
        super();
        this._state = state;
        if (!state) {
            this._state = new LinkState();
        }
    }

    get guid() { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name() { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get linkForGuid() { return this._state.forGuid; };
    set linkForGuid(value: string) { this._state.forGuid = value; };

    get url() { return this._state.url; };
    set url(value: string) { this._state.url = value; };

    public clone(): Link {
        return new Link(_.clone(this._state));
    }
}
