import { ProjectRole } from './project/projectroles/projectrole';
import * as _ from 'lodash';
export class ProjectState {
    name: string;
    guid: string;
    startDate?: Date;
    endDate?: Date;
    projectRoles: Array<ProjectRole>;
}
export class Project {
    private _state: ProjectState;
    constructor(state?: ProjectState) {
        this._state = state;
        if (!state) {
            this._state = new ProjectState();
        }
        if (this.projectRoles === undefined) {
            this.projectRoles = new Array<ProjectRole>();
        }
    }

    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get startDate(): Date { return this._state.startDate; };
    set startDate(value: Date) { this._state.startDate = value; };

    get endDate(): Date { return this._state.endDate; };
    set endDate(value: Date) { this._state.endDate = value; };

    get projectRoles(): Array<ProjectRole> { return this._state.projectRoles };
    set projectRoles(projectRoles: Array<ProjectRole>) { this._state.projectRoles = projectRoles };
    //    projectRoles: Array<ProjectRole>;
    public clone() : Project {
        return new Project(_.clone(this._state));
    }
}

