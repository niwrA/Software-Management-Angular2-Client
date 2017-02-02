import { Command, CommandParameters } from '../../commands/command';
import { Project } from '../project';
export class ProjectCommand extends Command {
    constructor(name: string, project: Project) {
        super(name, 'Project', project.guid);
    };
}

export class CreateProjectParameters extends CommandParameters {
    Name: string;
}
export class CreateProjectCommand extends ProjectCommand {
    constructor(project: Project) {
        super('Create', project);
        const parameters = new CreateProjectParameters();
        parameters.Name = project.name;
        this.Parameters = parameters;
    }
}

export class DeleteProjectCommand extends ProjectCommand {
    constructor(project: Project) {
        super('Delete', project);
    }
}


export class RenameProjectParameters extends CommandParameters {
    Name: string;
    OriginalName: string;
}
export class RenameProjectCommand extends ProjectCommand {
    constructor(project: Project, orgName: string) {
        super('Rename', project);
        const parameters = new RenameProjectParameters();
        parameters.OriginalName = orgName;
        parameters.Name = project.name;
        this.Parameters = parameters;
    }
}
export class ChangeStartDateParameters extends CommandParameters {
    StartDate?: string;
    OriginalStartDate?: string;
}
export class ChangeStartDateOfProjectCommand extends ProjectCommand {

    constructor(project: Project, orgStartDate?: string) {
        super('ChangeStartDateOf', project);
        const parameters = new ChangeStartDateParameters();
        parameters.OriginalStartDate = orgStartDate;
        parameters.StartDate = project.startDate;
        this.Parameters = parameters;
    }
}
export class ChangeEndDateParameters extends CommandParameters {
    EndDate?: string;
    OriginalEndDate?: string;
}
export class ChangeEndDateOfProjectCommand extends ProjectCommand {

    constructor(project: Project, orgEndDate?: string) {
        super('ChangeEndDateOf', project);
        const parameters = new ChangeEndDateParameters();
        parameters.OriginalEndDate = orgEndDate;
        parameters.EndDate = project.endDate;
        this.Parameters = parameters;
    }
}

export class AddRoleToProjectParameters extends CommandParameters {
    RoleGuid: string;
    RoleName: string;
}
export class AddRoleToProjectCommand extends ProjectCommand {

    constructor(project: Project, roleGuid: string, roleName: string) {
        super('AddRoleTo', project);
        const parameters = new AddRoleToProjectParameters();
        parameters.RoleGuid = roleGuid;
        parameters.RoleName = roleName;
        this.Parameters = parameters;
    }
}
export class RemoveRoleFromProjectParameters extends CommandParameters {
    RoleGuid: string;
}
export class RemoveRoleFromProjectCommand extends ProjectCommand {

    constructor(project: Project, roleGuid: string) {
        super('RemoveRoleFrom', project);
        const parameters = new RemoveRoleFromProjectParameters();
        parameters.RoleGuid = roleGuid;
        this.Parameters = parameters;
    }
}
