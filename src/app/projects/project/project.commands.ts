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
        let parameters = new CreateProjectParameters();
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
        let parameters = new RenameProjectParameters();
        parameters.OriginalName = orgName;
        parameters.Name = project.name;
        this.Parameters = parameters;
    }
}
export class ChangeStartDateParameters extends CommandParameters {
    StartDate?: Date;
    OriginalStartDate?: Date;
}
export class ChangeStartDateOfProjectCommand extends ProjectCommand {

    constructor(project: Project, orgStartDate?: Date) {
        super('ChangeStartDateOf', project);
        let parameters = new ChangeStartDateParameters();
        parameters.OriginalStartDate = orgStartDate;
        parameters.StartDate = project.startDate;
        this.Parameters = parameters;
    }
}
export class ChangeEndDateParameters extends CommandParameters {
    EndDate?: Date;
    OriginalEndDate?: Date;
}
export class ChangeEndDateOfProjectCommand extends ProjectCommand {

    constructor(project: Project, orgEndDate?: Date) {
        super('ChangeEndDateOf', project);
        let parameters = new ChangeEndDateParameters();
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
        let parameters = new AddRoleToProjectParameters();
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
        let parameters = new RemoveRoleFromProjectParameters();
        parameters.RoleGuid = roleGuid;
        this.Parameters = parameters;
    }
}