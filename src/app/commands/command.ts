export class Command {
    Name: string;
    Guid: string;
    EntityName: string;
    EntityGuid: string;
    CreateDate?: Date;
    Parameters?: string;

    constructor(name: string, entityName: string, entityGuid: string) {
        this.Name = name;
        this.EntityName = entityName;
        this.EntityGuid = entityGuid;
        this.CreateDate = new Date();
    }
}

