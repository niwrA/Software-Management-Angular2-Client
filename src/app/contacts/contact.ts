import * as _ from 'lodash';
export class ContactState {
    guid: string;
    name: string;
/*    prefix?: string;
    firstName?: string;
    firstInitial?: string;
    middleInitials?: string;
    lastNamePrefix?: string;
    lastName?: string;
    lastNameSuffix?: string;
    gender?: string;
*/    birthDate?: Date;
    email?: string;
}

export class Contact {
    _state: ContactState;
    constructor(state?: ContactState) {
        this._state = state;
        if (!state) {
            this._state = new ContactState();
        }
    }

    get guid() { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get name() { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get email() { return this._state.email; };
    set email(value: string) { this._state.email = value; };

    get birthDate() { return this._state.birthDate; };
    set birthDate(value: Date) { this._state.birthDate = value; };

    public clone(): Contact {
        return new Contact(_.clone(this._state));
    }
}

