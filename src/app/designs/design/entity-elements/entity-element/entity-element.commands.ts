import { Command, CommandParameters } from '../../../../commands/command';
import { EntityElement } from '../entity-element';

export class EntityElementCommand extends Command {
    constructor(name: string, entityElement: EntityElement) {
        super(name, 'EntityElement', entityElement.guid);
    };
}

export class EntityElementCommandParameters extends CommandParameters {
    DesignGuid: string;
}

export class CreateEntityElementParameters extends EntityElementCommandParameters {
    Name: string;
}
export class CreateEntityElementCommand extends EntityElementCommand {
    constructor(entityElement: EntityElement, designId: string) {
        super('Create', entityElement);
        const parameters = new CreateEntityElementParameters();
        parameters.Name = entityElement.name;
        parameters.DesignGuid = designId;
        this.Parameters = parameters;
    }
}

export class DeleteEntityElementCommand extends EntityElementCommand {
    constructor(entityElement: EntityElement, designId: string) {
        super('Delete', entityElement);
        const parameters = new EntityElementCommandParameters();
        parameters.DesignGuid = designId;
        this.Parameters = parameters;
    }
}

export class RenameEntityElementParameters extends EntityElementCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameEntityElementCommand extends EntityElementCommand {
    constructor(entityElement: EntityElement, orgName: string, designId: string) {
        super('Rename', entityElement);
        const parameters = new RenameEntityElementParameters();
        parameters.OriginalName = orgName;
        parameters.Name = entityElement.name;
        parameters.DesignGuid = designId;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfEntityElementParameters extends EntityElementCommandParameters {
    Description: string;
}

export class ChangeDescriptionOfEntityElementCommand extends EntityElementCommand {
    constructor(entityElement: EntityElement, designId: string) {
        super('ChangeDescriptionOf', entityElement);
        const parameters = new ChangeDescriptionOfEntityElementParameters();
        parameters.Description = entityElement.description;
        parameters.DesignGuid = designId;
        this.Parameters = parameters;
    }
}

