import { Command, CommandParameters } from '../../commands/command';
import { Company } from '../company';
import { CompanyRole } from '../company/companyroles/companyrole';
import { CompanyEnvironment } from '../company/companyenvironments/companyenvironment';
import { CompanyEnvironmentHardwareItem } from '../company/companyenvironments/companyenvironment/hardware/companyenvironmenthardware';
import { Database } from '../company/companyenvironments/companyenvironment/databases/database';
import { Account } from '../company/companyenvironments/companyenvironment/accounts/account';

export class CompanyCommand extends Command {
    constructor(name: string, company: Company) {
        super(name, 'Company', company.guid);
    };
}

export class EnvironmentCommand extends Command {
    constructor(name: string, company: Company, environment: CompanyEnvironment ) {
        super(name, 'CompanyEnvironment', environment.guid, 'Company', company.guid,);
    };
}

export class HardwareCommand extends Command {
    constructor(name: string, company: Company, hardware: CompanyEnvironmentHardwareItem) {
        super(name, 'CompanyEnvironmentHardware', hardware.guid, 'Company', company.guid);
    };
}

export class DatabaseCommand extends Command {
    constructor(name: string, company: Company, database: Database) {
        super(name, 'CompanyEnvironmentDatabase', database.guid, 'Company', company.guid);
    };
}

export class AccountCommand extends Command {
    constructor(name: string, company: Company, account: Account) {
        super(name, 'CompanyEnvironmentAccount', account.guid, 'Company', company.guid);
    };
}
export class CompanyRoleCommand extends Command {
    constructor(name: string, role: CompanyRole, company: Company) {
        super(name, 'CompanyRole', role.guid, 'Company', company.guid);
    };
}
export class CreateCompanyParameters extends CommandParameters {
    Name: string;
}

export class CreateCompanyCommand extends CompanyCommand {
    constructor(company: Company) {
        super('Create', company);
        const parameters = new CreateCompanyParameters();
        parameters.Name = company.name;
        this.Parameters = parameters;
    }
}

export class DeleteCompanyCommand extends CompanyCommand {
    constructor(company: Company) {
        super('Delete', company);
    }
}

export class RenameCompanyParameters extends CommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameCompanyCommand extends CompanyCommand {
    constructor(company: Company, orgName: string) {
        super('Rename', company);
        const parameters = new RenameCompanyParameters();
        parameters.OriginalName = orgName;
        parameters.Name = company.name;
        this.Parameters = parameters;
    }
}
export class ChangeCodeForCompanyParameters extends CommandParameters {
    Code: string;
    OriginalCode: string;
}

export class ChangeCodeForCompanyCommand extends CompanyCommand {
    constructor(company: Company, orgCode: string) {
        super('ChangeCodeFor', company);
        const parameters = new ChangeCodeForCompanyParameters();
        parameters.OriginalCode = orgCode;
        parameters.Code = company.code;
        this.Parameters = parameters;
    }
}
export class ChangeExternalIdForCompanyParameters extends CommandParameters {
    ExternalId: string;
    OriginalExternalId: string;
}

export class ChangeExternalIdForCompanyCommand extends CompanyCommand {
    constructor(company: Company, orgExternalId: string) {
        super('ChangeExternalIdFor', company);
        const parameters = new ChangeExternalIdForCompanyParameters();
        parameters.OriginalExternalId = orgExternalId;
        parameters.ExternalId = company.externalId;
        this.Parameters = parameters;
    }
}

export class AddRoleToCompanyParameters extends CommandParameters {
    RoleName: string;
}

export class AddRoleToCompanyCommand extends CompanyRoleCommand {
    constructor(company: Company, role: CompanyRole) {
        super('Add', role, company);
        const parameters = new AddRoleToCompanyParameters();
        parameters.RoleName = role.name;
        this.Parameters = parameters;
    }
}

export class RemoveRoleFromCompanyParameters extends CommandParameters {
    RoleGuid: string;
}

export class RemoveRoleFromCompanyCommand extends CompanyRoleCommand {

    constructor(company: Company, role: CompanyRole) {
        super('Remove', role, company);
        const parameters = new RemoveRoleFromCompanyParameters();
        parameters.RoleGuid = role.guid;
        this.Parameters = parameters;
    }
}

export class RenameRoleForCompanyParameters extends CommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameRoleForCompanyCommand extends CompanyRoleCommand {
    constructor(company: Company, companyrole: CompanyRole, orgName: string) {
        super('Rename', companyrole, company);
        const parameters = new RenameRoleForCompanyParameters();
        parameters.OriginalName = orgName;
        parameters.Name = companyrole.name;
        this.Parameters = parameters;
    }
}

export class EnvironmentCommandParameters extends CommandParameters {
    CompanyGuid: string;
    EnvironmentGuid: string;
}

export class AddEnvironmentToCompanyParameters extends EnvironmentCommandParameters {
    EnvironmentName: string;
}

export class AddEnvironmentToCompanyCommand extends EnvironmentCommand {
    constructor(company: Company, environment: CompanyEnvironment) {
        super('Add', company, environment);
        const parameters = new AddEnvironmentToCompanyParameters();
        parameters.EnvironmentName = environment.name;
        this.Parameters = parameters;
    }
}

export class RemoveEnvironmentFromCompanyCommand extends EnvironmentCommand {

    constructor(company: Company, environment: CompanyEnvironment) {
        super('Remove', company, environment);
        const parameters = new EnvironmentCommandParameters();
        this.Parameters = parameters;
    }
}

export class RenameEnvironmentParameters extends EnvironmentCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameEnvironmentCommand extends EnvironmentCommand {
    constructor(company: Company, companyenvironment: CompanyEnvironment, orgName: string) {
        super('Rename', company, companyenvironment);
        const parameters = new RenameEnvironmentParameters();
        parameters.OriginalName = orgName;
        parameters.Name = companyenvironment.name;
        this.Parameters = parameters;
    }
}

export class ChangeUrlForEnvironmentParameters extends EnvironmentCommandParameters {
    Url: string;
    OriginalUrl: string;
}

export class ChangeUrlForEnvironmentCommand extends EnvironmentCommand {
    constructor(company: Company, companyenvironment: CompanyEnvironment, orgUrl: string) {
        super('ChangeUrlFor', company, companyenvironment);
        const parameters = new ChangeUrlForEnvironmentParameters();
        parameters.OriginalUrl = orgUrl;
        parameters.Url = companyenvironment.url;
        this.Parameters = parameters;
    }
}

export class HardwareCommandParameters extends EnvironmentCommandParameters {
}

export class AddHardwareToEnvironmentParameters extends HardwareCommandParameters {
    HardwareName: string;
}

export class AddHardwareToEnvironmentCommand extends HardwareCommand {
    constructor(company: Company, hardware: CompanyEnvironmentHardwareItem) {
        super('Add', company, hardware);
        const parameters = new AddHardwareToEnvironmentParameters();
        parameters.EnvironmentGuid = hardware.companyEnvironmentGuid;
        parameters.HardwareName = hardware.name;
        this.Parameters = parameters;
    }
}

export class RemoveHardwareFromEnvironmentCommand extends HardwareCommand {

    constructor(company: Company, hardware: CompanyEnvironmentHardwareItem) {
        super('Remove', company, hardware);
        const parameters = new HardwareCommandParameters();
        parameters.EnvironmentGuid = hardware.companyEnvironmentGuid;
        this.Parameters = parameters;
    }
}

export class RenameHardwareParameters extends HardwareCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameHardwareCommand extends HardwareCommand {
    constructor(company: Company, hardware: CompanyEnvironmentHardwareItem, orgName: string) {
        super('Rename', company, hardware);
        const parameters = new RenameHardwareParameters();
        parameters.EnvironmentGuid = hardware.companyEnvironmentGuid;
        parameters.OriginalName = orgName;
        parameters.Name = hardware.name;
        this.Parameters = parameters;
    }
}

export class ChangeIPAddressForHardwareParameters extends HardwareCommandParameters {
    IPAddress: string;
    OriginalIPAddress: string;
}

export class ChangeIPAddressForHardwareCommand extends HardwareCommand {
    constructor(company: Company, hardware: CompanyEnvironmentHardwareItem, orgIp: string) {
        super('ChangeIpAddressFor', company, hardware);
        const parameters = new ChangeIPAddressForHardwareParameters();
        parameters.EnvironmentGuid = hardware.companyEnvironmentGuid;
        parameters.OriginalIPAddress = orgIp;
        parameters.IPAddress = hardware.ipAddress;
        this.Parameters = parameters;
    }
}

export class DatabaseCommandParameters extends EnvironmentCommandParameters {
}
export class AddDatabaseToEnvironmentParameters extends DatabaseCommandParameters {
    DatabaseName: string;
}

export class AddDatabaseToEnvironmentCommand extends DatabaseCommand {
    constructor(company: Company, database: Database) {
        super('Add', company, database);
        const parameters = new AddDatabaseToEnvironmentParameters();
        parameters.EnvironmentGuid = database.companyEnvironmentGuid;
        parameters.DatabaseName = database.name;
        this.Parameters = parameters;
    }
}

export class RemoveDatabaseFromEnvironmentCommand extends DatabaseCommand {

    constructor(company: Company, database: Database) {
        super('Remove', company, database);
        const parameters = new DatabaseCommandParameters();
        parameters.EnvironmentGuid = database.companyEnvironmentGuid;
        this.Parameters = parameters;
    }
}

export class RenameDatabaseParameters extends DatabaseCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameDatabaseCommand extends DatabaseCommand {
    constructor(company: Company, database: Database, orgName: string) {
        super('Rename', company, database);
        const parameters = new RenameDatabaseParameters();
        parameters.EnvironmentGuid = database.companyEnvironmentGuid;
        parameters.OriginalName = orgName;
        parameters.Name = database.name;
        this.Parameters = parameters;
    }
}


export class AccountCommandParameters extends EnvironmentCommandParameters {
    CompanyGuid: string;
    EnvironmentGuid: string;
}

//todo: rename back to add account to environment?
export class CreateAccountParameters extends AccountCommandParameters {
    AccountName: string;
}

export class CreateAccountCommand extends AccountCommand {
    constructor(account: Account, company: Company) {
        super('Create', company, account);
        const parameters = new CreateAccountParameters();
        parameters.EnvironmentGuid = account.companyEnvironmentGuid;
        parameters.AccountName = account.name;
        this.Parameters = parameters;
    }
}
export class RemoveAccountFromEnvironmentParameters extends EnvironmentCommandParameters {
    AccountGuid: string;
}

export class RemoveAccountFromEnvironmentCommand extends AccountCommand {

    constructor(company: Company, account: Account) {
        super('Remove', company, account);
        const parameters = new RemoveAccountFromEnvironmentParameters();
        parameters.EnvironmentGuid = account.companyEnvironmentGuid;
        this.Parameters = parameters;
    }
}

export class RenameAccountParameters extends AccountCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameAccountCommand extends AccountCommand {
    constructor(company: Company, account: Account, orgName: string) {
        super('Rename', company, account);
        const parameters = new RenameAccountParameters();
        parameters.EnvironmentGuid = account.companyEnvironmentGuid;
        parameters.OriginalName = orgName;
        parameters.Name = account.name;
        this.Parameters = parameters;
    }
}
