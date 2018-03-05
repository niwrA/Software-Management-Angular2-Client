import { Command, CommandParameters } from '../../commands/command';
import { Design } from '../design';
import { EntityElement } from './entity-elements/entity-element';

export class DesignCommand extends Command {
    constructor(name: string, design: Design) {
        super(name, 'Design', design.guid);
    };
}

export class EntityElementCommand extends Command {
    constructor(name: string, entityElement: EntityElement, design: Design) {
        super(name, 'EntityElement', entityElement.guid, 'Design', design.guid);
    };
}

export class CreateDesignParameters extends CommandParameters {
    Name: string;
}
export class CreateDesignCommand extends DesignCommand {
    constructor(design: Design) {
        super('Create', design);
        const parameters = new CreateDesignParameters();
        parameters.Name = design.name;
        this.Parameters = parameters;
    }
}

export class DeleteDesignCommand extends DesignCommand {
    constructor(design: Design) {
        super('Delete', design);
    }
}

export class RenameDesignParameters extends CommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameDesignCommand extends DesignCommand {
    constructor(design: Design, orgName: string) {
        super('Rename', design);
        const parameters = new RenameDesignParameters();
        parameters.OriginalName = orgName;
        parameters.Name = design.name;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfDesignParameters extends CommandParameters {
    Description: string;
}

export class ChangeDescriptionOfDesignCommand extends DesignCommand {
    constructor(design: Design) {
        super('ChangeDescriptionOf', design);
        const parameters = new ChangeDescriptionOfDesignParameters();
        parameters.Description = design.description;
        this.Parameters = parameters;
    }
}

export class AddChildToEntityElementParameters extends CommandParameters {
    Name: string;
    DesignGuid: string;
    EpicElementGuid: string;
    ParentGuid: string;
}

export class AddChildToEntityElementCommand extends EntityElementCommand {
    constructor(entityelement: EntityElement, design: Design) {
        super('AddChildTo', entityelement, design);
        const parameters = new AddChildToEntityElementParameters();
        parameters.Name = entityelement.name;
        parameters.EpicElementGuid = entityelement.epicGuid;
        parameters.ParentGuid = entityelement.parentGuid;
        this.Parameters = parameters;
    }
}

export class RemoveChildFromEntityElementParameters extends CommandParameters {
    DesignGuid: string;
    EpicElementGuid: string;
    ParentGuid: string;
}

export class RemoveChildFromEntityElementCommand extends EntityElementCommand {
    constructor(entityelement: EntityElement, parent: EntityElement, design: Design) {
        super('RemoveChildFrom', parent, design);
        const parameters = new RemoveChildFromEntityElementParameters();
        parameters.EpicElementGuid = entityelement.epicGuid;
        parameters.ParentGuid = entityelement.parentGuid;
        this.Parameters = parameters;
    }
}

