import { Command, CommandParameters } from '../../../../commands/command';
import { PropertyElement } from '../property-element';
import { EntityElement } from '../../entity-elements/entity-element';
import { EpicElement } from '../../epic-elements/epic-element';
export class PropertyElementCommand extends Command {
    constructor(name: string, propertyElement: PropertyElement) {
        super(name, 'PropertyElement', propertyElement.guid);
    };
}

export class PropertyCodeGenCommand extends Command {
    constructor(name: string, propertyElement: PropertyElement) {
        super(name, 'CodeGen', propertyElement.guid);
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

export class CreatePropertyCodeGenParameters extends PropertyElementCommandParameters {
    Name: string;
    TypeName: string;
    EntityName: string;
    EntitiesName: string;
    RootEntitiesName: string;
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



// to consider: make backend only?
export class CreatePropertyCodeGenCommand extends PropertyCodeGenCommand {
    constructor(propertyElement: PropertyElement, entityElement: EntityElement, epicElement: EpicElement) {
        super('CreateProperty', propertyElement);
        const parameters = new CreatePropertyCodeGenParameters();
        parameters.Name = propertyElement.name;
        parameters.TypeName = 'string'; // todo: typeName
        parameters.EntityName = entityElement.name;
        // todo: maybe find a pluralisation library or offer the option to add the plural
        // in the UI and move this to separate class with tests
        parameters.EntitiesName = this.pluralize(entityElement.name);
        parameters.RootEntitiesName = this.pluralize(epicElement.name);
        this.Parameters = parameters;
    }

    pluralize(name: string): string {
        if (name.slice(-1) === 'y') {
            return name.substr(0, name.length - 1) + 'ies';
        } else {
            return name + 's';
        }
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

export class ChangeDataTypeOfPropertyElementParameters extends PropertyElementCommandParameters {
    DataType: string;
    OriginalDataType: string;
}

export class ChangeDataTypeOfPropertyElementCommand extends PropertyElementCommand {
    constructor(propertyElement: PropertyElement, orgDataType: string) {
        super('ChangeDataTypeOf', propertyElement);
        const parameters = new ChangeDataTypeOfPropertyElementParameters();
        parameters.OriginalDataType = orgDataType;
        parameters.DataType = propertyElement.dataType;
        parameters.DesignGuid = propertyElement.designGuid;
        parameters.EpicElementGuid = propertyElement.epicGuid;
        parameters.EntityElementGuid = propertyElement.entityGuid;
        this.Parameters = parameters;
    }
}

export class ChangeIsStateForPropertyElementParameters extends PropertyElementCommandParameters {
    IsState: boolean;
}

export class ChangeIsStateForPropertyElementCommand extends PropertyElementCommand {
    constructor(propertyElement: PropertyElement, newValue: boolean) {
        super('ChangeIsStateFor', propertyElement);
        const parameters = new ChangeIsStateForPropertyElementParameters();
        parameters.IsState = newValue;
        parameters.DesignGuid = propertyElement.designGuid;
        parameters.EpicElementGuid = propertyElement.epicGuid;
        parameters.EntityElementGuid = propertyElement.entityGuid;
        this.Parameters = parameters;
    }
}

