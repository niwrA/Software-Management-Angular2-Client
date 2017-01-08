export class Command {
    Type: string;
    Guid: string;
    EntityName: string;
    EntityGuid: string;
    CreateDate?: Date;
    Parameters?: string;

    constructor(type: string, entityName: string, entityGuid: string) {
        this.Type = type;
        this.EntityName = entityName;
        this.EntityGuid = entityGuid;
        this.CreateDate = new Date();
    }
}

