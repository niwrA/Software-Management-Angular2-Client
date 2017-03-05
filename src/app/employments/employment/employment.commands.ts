import { Command, CommandParameters } from '../../commands/command';
import { Employment } from '../employment';
export class EmploymentCommand extends Command {
    constructor(name: string, employment: Employment) {
        super(name, 'Employment', employment.guid);
    };
}

export class CreateEmploymentParameters extends CommandParameters {
    ContactGuid: string;
    CompanyRoleGuid: string;
    ContactName: string;
}
export class CreateEmploymentCommand extends EmploymentCommand {
    constructor(employment: Employment) {
        super('Create', employment);
        const parameters = new CreateEmploymentParameters();
        parameters.ContactGuid = employment.contactGuid;
        parameters.CompanyRoleGuid = employment.companyRoleGuid;
        parameters.ContactName = employment.contactName;
        this.Parameters = parameters;
    }
}

export class DeleteEmploymentCommand extends EmploymentCommand {
    constructor(employment: Employment) {
        super('Delete', employment);
    }
}

export class ChangeStartDateParameters extends CommandParameters {
    StartDate?: string;
    OriginalStartDate?: string;
}
export class ChangeStartDateOfEmploymentCommand extends EmploymentCommand {

    constructor(employment: Employment, orgStartDate?: string) {
        super('ChangeStartDateOf', employment);
        const parameters = new ChangeStartDateParameters();
        parameters.OriginalStartDate = orgStartDate;
        parameters.StartDate = employment.startDate;
        this.Parameters = parameters;
    }
}

export class ChangeEndDateParameters extends CommandParameters {
    EndDate?: string;
    OriginalEndDate?: string;
}
export class ChangeEndDateOfEmploymentCommand extends EmploymentCommand {
    constructor(employment: Employment, orgEndDate?: string) {
        super('ChangeEndDateOf', employment);
        const parameters = new ChangeEndDateParameters();
        parameters.OriginalEndDate = orgEndDate;
        parameters.EndDate = employment.endDate;
        this.Parameters = parameters;
    }
}
