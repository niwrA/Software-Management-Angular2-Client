import { SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';
export class FileState {
    guid: string;
    name: string;
    forGuid: string;
    forType: string;
    url: string;
    description: string;
    fileName: string;
    folderName: string;
    type: string;
    contentType: string;
    size: number;
}
export class SelectableItem {
    isSelected: boolean;
}
export class File extends SelectableItem {
    _state: FileState;
    _cardType = 'default';
    _previewUrl = '';
    _icon = 'file_download';
    _embeddedUrl: SafeResourceUrl;
    _showActions = false;

    constructor(state?: FileState) {
        super();
        this._state = state;
        if (!state) {
            this._state = new FileState();
        } else {
            // this should be in the component, but for now it's easier here
            const type = this._state.type;
            if (type === '.jpg' || type === '.png' || type === '.gif' || type === '.bmp' || type === '.jpeg' || type === '.svg') {
                this._cardType = 'image';
                this._previewUrl = this._state.url;
                this._icon = 'image';
            }
            if (type === '.webm' || type === '.mov' || type === '.mp4' || type === '.mpg' || type === '.mpeg') {
                this._cardType = 'video';
                this._icon = 'play_circle_outline';
            }
        }
    }

    get guid() { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name() { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get fileName() { return this._state.fileName; };
    set fileName(value: string) { this._state.fileName = value; };

    get folderName() { return this._state.forType + '/' + this._state.forGuid; };

    get description() { return this._state.description; };
    set description(value: string) { this._state.description = value; };

    get forGuid() { return this._state.forGuid; };
    set forGuid(value: string) { this._state.forGuid = value; };

    get forType() { return this._state.forType; };
    set forType(value: string) { this._state.forType = value; };
    //    set cardType(value: string) { this._cardType = value; }

    get type() { return this._state.type; };
    set type(value: string) { this._state.type = value; };

    get embeddedUrl() { return this._embeddedUrl; };
    set embeddedUrl(value: SafeResourceUrl) { this._embeddedUrl = value; };

    get showActions() { return this._showActions; };
    set showActions(value: boolean) { this._showActions = value; };


    get url() { return environment.staticFilesUrl + '/' + this.folderName + '/' + this._state.fileName; };
    get previewUrl() { return this._previewUrl; }
    get cardType() { return this._cardType; }
    get icon() { return this._icon; }


    public clone(): File {
        return new File(_.clone(this._state));
    }
}
