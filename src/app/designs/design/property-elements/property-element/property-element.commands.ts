import { Command, CommandParameters } from '../../../../commands/command';
import { PropertyElement } from '../property-element';
import { EntityElement } from '../../entity-elements/entity-element';
import { EpicElement } from '../../epic-elements/epic-element';
import { Design } from '../../../design';
export class PropertyElementCommand extends Command {
    constructor(name: string, propertyElement: PropertyElement, design: Design) {
        super(name, 'PropertyElement', propertyElement.guid, 'Design', design.guid);
    };
}

export class PropertyCodeGenCommand extends Command {
    constructor(name: string, propertyElement: PropertyElement) {
        super(name, 'CodeGen', propertyElement.guid);
    };
}

export class PropertyElementCommandParameters extends CommandParameters {
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
    constructor(propertyElement: PropertyElement, design: Design) {
        super('Create', propertyElement, design);
        const parameters = new CreatePropertyElementParameters();
        parameters.Name = propertyElement.name;
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
    constructor(propertyElement: PropertyElement, design: Design) {
        super('Delete', propertyElement, design);
        const parameters = new PropertyElementCommandParameters();
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
    constructor(propertyElement: PropertyElement, design: Design, orgName: string) {
        super('Rename', propertyElement, design);
        const parameters = new RenamePropertyElementParameters();
        parameters.OriginalName = orgName;
        parameters.Name = propertyElement.name;
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
    constructor(propertyElement: PropertyElement, design: Design) {
        super('ChangeDescriptionOf', propertyElement, design);
        const parameters = new ChangeDescriptionOfPropertyElementParameters();
        parameters.Description = propertyElement.description;
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
    constructor(propertyElement: PropertyElement, design: Design, orgDataType: string) {
        super('ChangeDataTypeOf', propertyElement, design);
        const parameters = new ChangeDataTypeOfPropertyElementParameters();
        parameters.OriginalDataType = orgDataType;
        parameters.DataType = propertyElement.dataType;
        parameters.EpicElementGuid = propertyElement.epicGuid;
        parameters.EntityElementGuid = propertyElement.entityGuid;
        this.Parameters = parameters;
    }
}

export class ChangeIsStateForPropertyElementParameters extends PropertyElementCommandParameters {
    IsState: boolean;
}

export class ChangeIsStateForPropertyElementCommand extends PropertyElementCommand {
    constructor(propertyElement: PropertyElement, design: Design, newValue: boolean) {
        super('ChangeIsStateFor', propertyElement, design);
        const parameters = new ChangeIsStateForPropertyElementParameters();
        parameters.IsState = newValue;
        parameters.EpicElementGuid = propertyElement.epicGuid;
        parameters.EntityElementGuid = propertyElement.entityGuid;
        this.Parameters = parameters;
    }
}

