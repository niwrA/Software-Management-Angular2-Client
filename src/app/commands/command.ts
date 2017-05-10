export class Command {
    Name: string;
    Guid: string;
    Entity: string;
    EntityGuid: string;
    CreatedOn: Date;
    ParametersJson?: string;
    Parameters?: CommandParameters;
    DisplayProperties: CommandDisplayProperties;
    constructor(type: string, entityName: string, entityGuid: string) {
        const now = new Date();
        this.Name = type;
        this.Entity = entityName;
        this.EntityGuid = entityGuid;
        this.CreatedOn = now;
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
