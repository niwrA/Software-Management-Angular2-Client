import { Command, CommandParameters } from '../../../../commands/command';
import { CommandElement } from '../command-element';

export class CommandElementCommand extends Command {
    constructor(name: string, commandElement: CommandElement) {
        super(name, 'CommandElement', commandElement.guid);
    };
}

export class CommandElementCommandParameters extends CommandParameters {
    DesignGuid: string;
}

export class CreateCommandElementParameters extends CommandElementCommandParameters {
    Name: string;
}
export class CreateCommandElementCommand extends CommandElementCommand {
    constructor(commandElement: CommandElement, designId: string) {
        super('Create', commandElement);
        const parameters = new CreateCommandElementParameters();
        parameters.Name = commandElement.name;
        parameters.DesignGuid = designId;
        this.Parameters = parameters;
    }
}

export class DeleteCommandElementCommand extends CommandElementCommand {
    constructor(commandElement: CommandElement, designId: string) {
        super('Delete', commandElement);
        const parameters = new CommandElementCommandParameters();
        parameters.DesignGuid = designId;
        this.Parameters = parameters;
    }
}

export class RenameCommandElementParameters extends CommandElementCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameCommandElementCommand extends CommandElementCommand {
    constructor(commandElement: CommandElement, orgName: string, designId: string) {
        super('Rename', commandElement);
        const parameters = new RenameCommandElementParameters();
        parameters.OriginalName = orgName;
        parameters.Name = commandElement.name;
        parameters.DesignGuid = designId;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfCommandElementParameters extends CommandElementCommandParameters {
    Description: string;
}

export class ChangeDescriptionOfCommandElementCommand extends CommandElementCommand {
    constructor(commandElement: CommandElement, designId: string) {
        super('ChangeDescriptionOf', commandElement);
        const parameters = new ChangeDescriptionOfCommandElementParameters();
        parameters.Description = commandElement.description;
        parameters.DesignGuid = designId;
        this.Parameters = parameters;
    }
}

