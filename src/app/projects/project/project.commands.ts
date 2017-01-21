import { Command, CommandParameters } from '../../commands/command';
import { Project } from '../project';
export class ProjectCommand extends Command {
    constructor(name: string, project: Project) {
        super(name, 'Project', project.Guid);
    };
}

export class CreateProjectParameters extends CommandParameters {
    Name: string;
}
export class CreateProjectCommand extends ProjectCommand {
    constructor(project: Project) {
        super('Create', project);
        let parameters = new CreateProjectParameters();
        parameters.Name = project.Name;
        this.Parameters = parameters;
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
        parameters.Name = project.Name;
        this.Parameters = parameters;
    }
}
export class ChangeStartDateParameters extends CommandParameters {
    StartDate?: Date;
    OriginalStartDate?: Date;
}
export class ChangeStartDateForProjectCommand extends ProjectCommand {

    constructor(project: Project, orgStartDate?: Date) {
        super('ChangeStartDateFor', project);
        let parameters = new ChangeStartDateParameters();
        parameters.OriginalStartDate = orgStartDate;
        parameters.StartDate = project.StartDate;
        this.Parameters = parameters;
    }
}
export class ChangeEndDateParameters extends CommandParameters {
    EndDate?: Date;
    OriginalEndDate?: Date;
}
export class ChangeEndDateForProjectCommand extends ProjectCommand {

    constructor(project: Project, orgEndDate?: Date) {
        super('ChangeEndDateFor', project);
        let parameters = new ChangeEndDateParameters();
        parameters.OriginalEndDate = orgEndDate;
        parameters.EndDate = project.EndDate;
        this.Parameters = parameters;
    }
}
