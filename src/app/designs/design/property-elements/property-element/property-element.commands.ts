import { Command, CommandParameters } from '../../../../commands/command';
import { PropertyElement } from '../property-element';

export class PropertyElementCommand extends Command {
    constructor(name: string, propertyElement: PropertyElement) {
        super(name, 'PropertyElement', propertyElement.guid);
    };
}

export class PropertyElementCommandParameters extends CommandParameters {
    DesignGuid: string;
    EpicElementGuid: string;
    EntityElementGuid: string;
}

export class CreatePropertyElementParameters extends PropertyElementCommandParameters {
    Name: string;
}
export class CreatePropertyElementCommand extends PropertyElementCommand {
    constructor(propertyElement: PropertyElement) {
        super('Create', propertyElement);
        const parameters = new CreatePropertyElementParameters();
        parameters.Name = propertyElement.name;
        parameters.DesignGuid = propertyElement.designGuid;
        parameters.EpicElementGuid = propertyElement.epicGuid;
        parameters.EntityElementGuid = propertyElement.entityGuid;
        this.Parameters = parameters;
    }
}

export class DeletePropertyElementCommand extends PropertyElementCommand {
    constructor(propertyElement: PropertyElement) {
        super('Delete', propertyElement);
        const parameters = new PropertyElementCommandParameters();
        parameters.DesignGuid = propertyElement.designGuid;
        parameters.EpicElementGuid = propertyElement.epicGuid;
        parameters.EntityElementGuid = propertyElement.entityGuid;
        this.Parameters = parameters;
    }
}

export class RenamePropertyElementParameters extends PropertyElementCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenamePropertyElementCommand extends PropertyElementCommand {
    constructor(propertyElement: PropertyElement, orgName: string) {
        super('Rename', propertyElement);
        const parameters = new RenamePropertyElementParameters();
        parameters.OriginalName = orgName;
        parameters.Name = propertyElement.name;
        parameters.DesignGuid = propertyElement.designGuid;
        parameters.EpicElementGuid = propertyElement.epicGuid;
        parameters.EntityElementGuid = propertyElement.entityGuid;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfPropertyElementParameters extends PropertyElementCommandParameters {
    Description: string;
}

export class ChangeDescriptionOfPropertyElementCommand extends PropertyElementCommand {
    constructor(propertyElement: PropertyElement) {
        super('ChangeDescriptionOf', propertyElement);
        const parameters = new ChangeDescriptionOfPropertyElementParameters();
        parameters.Description = propertyElement.description;
        parameters.DesignGuid = propertyElement.designGuid;
        parameters.EpicElementGuid = propertyElement.epicGuid;
        parameters.EntityElementGuid = propertyElement.entityGuid;
        this.Parameters = parameters;
    }
}

