export class ProjectRoleState {
    guid: string;
    name: string;
    projectGuid: string;
}
export class ProjectRole {
    private _state: ProjectRoleState;
    constructor(state?: ProjectRoleState) {
        this._state = state;
        if (!state) {
            this._state = new ProjectRoleState();
        }
    }
    get name(): string { return this._state.name; };
    set name(value: string) { this._state.name = value; };

    get guid(): string { return this._state.guid; };
    set guid(value: string) { this._state.guid = value; };

    get projectGuid(): string { return this._state.projectGuid; };
    set projectGuid(value: string) { this._state.projectGuid = value; };
}
