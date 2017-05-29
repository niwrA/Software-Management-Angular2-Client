import * as _ from 'lodash';
export class ProjectRoleAssignmentState {
    guid: string;
    contactGuid: string;
    projectGuid: string;
    projectRoleGuid: string;
    startDate: string;
    endDate: string;
    contactName: string;
}

export class ProjectRoleAssignment {
    private _state: ProjectRoleAssignmentState;
    constructor(state?: ProjectRoleAssignmentState) {
        this._state = state;
        if (!state) {
            this._state = new ProjectRoleAssignmentState();
        }
    }

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get contactGuid(): string { return this._state.contactGuid; };
    set contactGuid(value: string) { this._state.contactGuid = value; };

    get projectGuid(): string { return this._state.projectGuid; };
    set projectGuid(value: string) { this._state.projectGuid = value; };

    get projectRoleGuid(): string { return this._state.projectRoleGuid; };
    set projectRoleGuid(value: string) { this._state.projectRoleGuid = value; };

    get contactName(): string { return this._state.contactName; };
    set contactName(value: string) { this._state.contactName = value; };

    get startDate(): string { return this._state.startDate; };
    set startDate(value: string) { this._state.startDate = value; };

    get endDate(): string { return this._state.endDate; };
    set endDate(value: string) { this._state.endDate = value; };

    public clone(): ProjectRoleAssignment {
        return new ProjectRoleAssignment(_.clone(this._state));
    }
}
