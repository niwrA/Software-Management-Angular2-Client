import { Command, CommandParameters } from '../../../../commands/command';
import { EntityElement } from '../entity-element';
import { Design } from '../../../design';

export class EntityElementCommand extends Command {
    constructor(name: string, entityElement: EntityElement, design: Design) {
        super(name, 'EntityElement', entityElement.guid, 'Design', design.guid);
    };
}

export class EntityElementCommandParameters extends CommandParameters {
    EpicElementGuid: string;
}

export class CreateEntityElementParameters extends EntityElementCommandParameters {
    Name: string;
}
export class CreateEntityElementCommand extends EntityElementCommand {
    constructor(entityElement: EntityElement, design: Design) {
        super('Create', entityElement, design);
        const parameters = new CreateEntityElementParameters();
        parameters.Name = entityElement.name;
        parameters.EpicElementGuid = entityElement.epicGuid;
        this.Parameters = parameters;
    }
}

export class DeleteEntityElementCommand extends EntityElementCommand {
    constructor(entityElement: EntityElement, design: Design) {
        super('Delete', entityElement, design);
        const parameters = new EntityElementCommandParameters();
        parameters.EpicElementGuid = entityElement.epicGuid;
        this.Parameters = parameters;
    }
}

export class RenameEntityElementParameters extends EntityElementCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameEntityElementCommand extends EntityElementCommand {
    constructor(entityElement: EntityElement, design: Design, orgName: string) {
        super('Rename', entityElement, design);
        const parameters = new RenameEntityElementParameters();
        parameters.OriginalName = orgName;
        parameters.Name = entityElement.name;
        parameters.EpicElementGuid = entityElement.epicGuid;
        this.Parameters = parameters;
    }
}

export class ChangePluralNameOfEntityElementParameters extends EntityElementCommandParameters {
    PluralName: string;
    OriginalPluralName: string;
}

export class ChangePluralNameOfEntityElementCommand extends EntityElementCommand {
    constructor(entityElement: EntityElement, design: Design, orgName: string) {
        super('ChangePluralNameOf', entityElement, design);
        const parameters = new ChangePluralNameOfEntityElementParameters();
        parameters.OriginalPluralName = orgName;
        parameters.PluralName = entityElement.pluralName;
        parameters.EpicElementGuid = entityElement.epicGuid;
        this.Parameters = parameters;
    }
}

export class ChangeIsCollectionForEntityElementParameters extends EntityElementCommandParameters {
    IsCollection: boolean;
}

export class ChangeIsCollectionForEntityElementCommand extends EntityElementCommand {
    constructor(entityElement: EntityElement, design: Design, newValue: boolean) {
        super('ChangeIsCollectionFor', entityElement, design);
        const parameters = new ChangeIsCollectionForEntityElementParameters();
        parameters.IsCollection    = newValue;
        parameters.EpicElementGuid = entityElement.epicGuid;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfEntityElementParameters extends EntityElementCommandParameters {
    Description: string;
}

export class ChangeDescriptionOfEntityElementCommand extends EntityElementCommand {
    constructor(entityElement: EntityElement, design: Design) {
        super('ChangeDescriptionOf', entityElement, design);
        const parameters = new ChangeDescriptionOfEntityElementParameters();
        parameters.Description = entityElement.description;
        parameters.EpicElementGuid = entityElement.epicGuid;
        this.Parameters = parameters;
    }
}

