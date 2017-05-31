import { UUID } from 'angular2-uuid';
export class Command {
    Name: string;
    Guid: string;
    Entity: string;
    EntityGuid: string;
    CreatedOn: string;
    ParametersJson?: string;
    Parameters?: CommandParameters;
    DisplayProperties: CommandDisplayProperties;
    constructor(type: string, entityName: string, entityGuid: string) {
        const now = new Date();
        this.Guid = UUID.UUID();
        this.Name = type;
        this.Entity = entityName;
        this.EntityGuid = entityGuid;
        this.CreatedOn = now.toDateString();
        this.DisplayProperties = new CommandDisplayProperties();
        this.DisplayProperties.title = this.Name + ' ' + this.Entity;
        this.DisplayProperties.description = this.CreatedOn.toString();
    }
}

export class CommandParameters {

}
export class CommandDisplayProperties {
    title: string;
    description: string;
}
