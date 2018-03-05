import { Command, CommandParameters } from '../../../../commands/command';
import { EpicElement } from '../epic-element';
import { Design } from '../../../design';

export class EpicElementCommand extends Command {
    constructor(name: string, epicElement: EpicElement, design: Design) {
        super(name, 'EpicElement', epicElement.guid, 'Design', design.guid);
    };
}

export class EpicElementCommandParameters extends CommandParameters {
}

export class CreateEpicElementParameters extends EpicElementCommandParameters {
    Name: string;
}
export class CreateEpicElementCommand extends EpicElementCommand {
    constructor(epicElement: EpicElement, design: Design) {
        super('Create', epicElement, design);
        const parameters = new CreateEpicElementParameters();
        parameters.Name = epicElement.name;
        this.Parameters = parameters;
    }
}

export class DeleteEpicElementCommand extends EpicElementCommand {
    constructor(epicElement: EpicElement, design: Design) {
        super('Delete', epicElement, design);
        const parameters = new EpicElementCommandParameters();
        this.Parameters = parameters;
    }
}

export class RenameEpicElementParameters extends EpicElementCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameEpicElementCommand extends EpicElementCommand {
    constructor(epicElement: EpicElement, design: Design, orgName: string) {
        super('Rename', epicElement, design);
        const parameters = new RenameEpicElementParameters();
        parameters.OriginalName = orgName;
        parameters.Name = epicElement.name;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfEpicElementParameters extends EpicElementCommandParameters {
    Description: string;
}

export class ChangeDescriptionOfEpicElementCommand extends EpicElementCommand {
    constructor(epicElement: EpicElement, design: Design) {
        super('ChangeDescriptionOf', epicElement, design);
        const parameters = new ChangeDescriptionOfEpicElementParameters();
        parameters.Description = epicElement.description;
        this.Parameters = parameters;
    }
}

