import { ProjectRole, ProjectRoleState } from './project/projectroles/projectrole';
import * as _ from 'lodash';
export class ProjectState {
    name: string;
    guid: string;
    startDate: string;
    endDate: string;
    projectRoles: Array<ProjectRoleState>;
}

export class Project {
    private _state: ProjectState;
    projectRoles: Array<ProjectRole>;
    constructor(state?: ProjectState) {
        this._state = state;
        if (!state) {
            this._state = new ProjectState();
        }
        if (this.projectRoles === undefined) {
            this.projectRoles = new Array<ProjectRole>();
        }
        for (const projectRoleState of state.projectRoles) {
            this.projectRoles.push(new ProjectRole(projectRoleState));
        }
    }

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get startDate(): string { return this._state.startDate; };
    set startDate(value: string) { this._state.startDate = value; };

    get endDate(): string { return this._state.endDate; };
    set endDate(value: string) { this._state.endDate = value; };

    public clone(): Project {
        return new Project(_.clone(this._state));
    }
}
