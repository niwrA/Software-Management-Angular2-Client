import { Command } from '../../commands/command';
import { Project } from '../project';
export class ProjectCommand extends Command {
    constructor(project: Project) { 
        super(project.Name, 'Project', project.Guid); 
    };
}
