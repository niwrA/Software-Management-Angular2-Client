import { SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';
export class FileState {
    guid: string;
    name: string;
    forGuid: string;
    url: string;
    description: string;
    fileName: string;
    folderName: string;
    type: string;
}
export class SelectableItem {
    isSelected: boolean;
}
export class File extends SelectableItem {
    _state: FileState;
    _embeddedUrl: SafeResourceUrl;
    constructor(state?: FileState) {
        super();
        this._state = state;
        if (!state) {
            this._state = new FileState();
        }
    }

    get guid() { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name() { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get fileName() { return this._state.fileName; };
    set fileName(value: string) { this._state.fileName = value; };

    get folderName() { return this._state.folderName; };
    set folderName(value: string) { this._state.folderName = value; };

    get description() { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    get forGuid() { return this._state.forGuid; };
    set forGuid(value: string) { this._state.forGuid = value; };

    get url() { return environment.staticFilesUrl + '/' + this._state.folderName + '/' + this._state.fileName; };

    get type() { return this._state.type; };
    set type(value: string) { this._state.type = value; };

    get embeddedUrl() { return this._embeddedUrl; };
    set embeddedUrl(value: SafeResourceUrl) { this._embeddedUrl = value; };

    public clone(): File {
        return new File(_.clone(this._state));
    }
}
