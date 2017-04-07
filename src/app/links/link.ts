import * as _ from 'lodash';
export class LinkState {
    guid: string;
    name: string;
    forGuid: string;
    url: string;
    description: string;
    siteName: string;
    imageUrl: string;
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

    get siteName() { return this._state.siteName; };
    set siteName(value: string) { this._state.siteName = value; };

    get description() { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    get forGuid() { return this._state.forGuid; };
    set forGuid(value: string) { this._state.forGuid = value; };

    get url() { return this._state.url; };
    set url(value: string) { this._state.url = value; };

    get imageUrl() { return this._state.imageUrl; };
    set imageUrl(value: string) { this._state.imageUrl = value; };

    public clone(): Link {
        return new Link(_.clone(this._state));
    }
}
