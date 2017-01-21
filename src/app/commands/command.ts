export class Command {
    Name: string;
    Guid: string;
    Entity: string;
    EntityGuid: string;
    CreatedOn: Date;
    ParametersJson?: string;
    Parameters?: CommandParameters;

    constructor(type: string, entityName: string, entityGuid: string) {
        this.Name = type;
        this.Entity = entityName;
        this.EntityGuid = entityGuid;
        this.CreatedOn = new Date();
    }
}

export class CommandParameters {

}
