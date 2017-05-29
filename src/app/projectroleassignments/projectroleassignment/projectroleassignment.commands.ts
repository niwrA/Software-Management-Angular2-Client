import { Command, CommandParameters } from '../../commands/command';
import { ProjectRoleAssignment } from '../projectroleassignment';
export class ProjectRoleAssignmentCommand extends Command {
    constructor(name: string, projectroleassignment: ProjectRoleAssignment) {
        super(name, 'ProjectRoleAssignment', projectroleassignment.guid);
    };
}

export class CreateProjectRoleAssignmentParameters extends CommandParameters {
    ContactGuid: string;
    ProjectGuid: string;
    ProjectRoleGuid: string;
    ContactName: string;
}
export class CreateProjectRoleAssignmentCommand extends ProjectRoleAssignmentCommand {
    constructor(projectroleassignment: ProjectRoleAssignment) {
        super('Create', projectroleassignment);
        const parameters = new CreateProjectRoleAssignmentParameters();
        parameters.ContactGuid = projectroleassignment.contactGuid;
        parameters.ProjectGuid = projectroleassignment.projectGuid;
        parameters.ProjectRoleGuid = projectroleassignment.projectRoleGuid;
        parameters.ContactName = projectroleassignment.contactName;
        this.Parameters = parameters;
    }
}

export class DeleteProjectRoleAssignmentCommand extends ProjectRoleAssignmentCommand {
    constructor(projectroleassignment: ProjectRoleAssignment) {
        super('Delete', projectroleassignment);
    }
}

export class ChangeStartDateParameters extends CommandParameters {
    StartDate?: string;
    OriginalStartDate?: string;
}
export class ChangeStartDateOfProjectRoleAssignmentCommand extends ProjectRoleAssignmentCommand {

    constructor(projectroleassignment: ProjectRoleAssignment, orgStartDate?: string) {
        super('ChangeStartDateOf', projectroleassignment);
        const parameters = new ChangeStartDateParameters();
        parameters.OriginalStartDate = orgStartDate;
        parameters.StartDate = projectroleassignment.startDate;
        this.Parameters = parameters;
    }
}

export class ChangeEndDateParameters extends CommandParameters {
    EndDate?: string;
    OriginalEndDate?: string;
}
export class ChangeEndDateOfProjectRoleAssignmentCommand extends ProjectRoleAssignmentCommand {
    constructor(projectroleassignment: ProjectRoleAssignment, orgEndDate?: string) {
        super('ChangeEndDateOf', projectroleassignment);
        const parameters = new ChangeEndDateParameters();
        parameters.OriginalEndDate = orgEndDate;
        parameters.EndDate = projectroleassignment.endDate;
        this.Parameters = parameters;
    }
}
