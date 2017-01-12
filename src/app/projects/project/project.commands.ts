import { Command } from '../../commands/command';
import { Project } from '../project';
export class ProjectCommand extends Command {
    constructor(name: string, project: Project) {
        super(name, 'Project', project.Guid);
    };
}

export class CreateProjectCommand extends ProjectCommand {
    constructor(project: Project) {
        super('Create', project);
    }
}

export class RenameProjectCommand extends ProjectCommand {
    Name: string;
    OriginalName: string;

    constructor(project: Project, orgName: string) {
        super('Rename', project);
        this.OriginalName = orgName;
        this.Name = project.Name;
    }
}
export class RescheduleProjectCommand extends ProjectCommand {
    StartDate?: Date;
    EndDate?: Date;
    OriginalStartDate?: Date;
    OriginalEndDate?: Date;

    constructor(project: Project, orgStartDate?: Date, orgEndDate?: Date) {
        super('Reschedule', project);
        this.OriginalStartDate = orgStartDate;
        this.OriginalEndDate = orgEndDate;
        this.StartDate = project.StartDate;
        this.EndDate = project.EndDate;
    }
}
