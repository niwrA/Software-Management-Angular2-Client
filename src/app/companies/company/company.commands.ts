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
    constructor(name: string, company: Company) {
        super(name, 'CompanyEnvironment', company.guid);
    };
}

export class HardwareCommand extends Command {
    constructor(name: string, company: Company) {
        super(name, 'CompanyEnvironmentHardware', company.guid);
    };
}

export class DatabaseCommand extends Command {
    constructor(name: string, company: Company) {
        super(name, 'CompanyEnvironmentDatabase', company.guid);
    };
}

export class AccountCommand extends Command {
    constructor(name: string, company: Company) {
        super(name, 'CompanyEnvironmentAccount', company.guid);
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
        parameters.Code  = company.code;
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
        parameters.ExternalId  = company.externalId;
        this.Parameters = parameters;
    }
}

export class AddRoleToCompanyParameters extends CommandParameters {
    RoleGuid: string;
    RoleName: string;
}

export class AddRoleToCompanyCommand extends CompanyCommand {
    constructor(company: Company, roleGuid: string, roleName: string) {
        super('AddRoleTo', company);
        const parameters = new AddRoleToCompanyParameters();
        parameters.RoleGuid = roleGuid;
        parameters.RoleName = roleName;
        this.Parameters = parameters;
    }
}

export class RemoveRoleFromCompanyParameters extends CommandParameters {
    RoleGuid: string;
}

export class RemoveRoleFromCompanyCommand extends CompanyCommand {

    constructor(company: Company, roleGuid: string) {
        super('RemoveRoleFrom', company);
        const parameters = new RemoveRoleFromCompanyParameters();
        parameters.RoleGuid = roleGuid;
        this.Parameters = parameters;
    }
}

export class RenameRoleForCompanyParameters extends CommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameRoleForCompanyCommand extends CompanyCommand {
    constructor(company: Company, companyrole: CompanyRole, orgName: string) {
        super('RenameRoleFor', company);
        const parameters = new RenameRoleForCompanyParameters();
        parameters.OriginalName = orgName;
        parameters.Name = companyrole.name;
        this.Parameters = parameters;
    }
}

export class EnvironmentCommandParameters extends CommandParameters {
    EnvironmentGuid: string;
}

export class AddEnvironmentToCompanyParameters extends EnvironmentCommandParameters {
    EnvironmentName: string;
}

export class AddEnvironmentToCompanyCommand extends CompanyCommand {
    constructor(company: Company, environmentGuid: string, environmentName: string) {
        super('AddEnvironmentTo', company);
        const parameters = new AddEnvironmentToCompanyParameters();
        parameters.EnvironmentGuid = environmentGuid;
        parameters.EnvironmentName = environmentName;
        this.Parameters = parameters;
    }
}

export class RemoveEnvironmentFromCompanyCommand extends CompanyCommand {

    constructor(company: Company, environmentGuid: string) {
        super('RemoveEnvironmentFrom', company);
        const parameters = new EnvironmentCommandParameters();
        parameters.EnvironmentGuid = environmentGuid;
        this.Parameters = parameters;
    }
}

export class RenameEnvironmentParameters extends EnvironmentCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameEnvironmentCommand extends EnvironmentCommand {
    constructor(company: Company, companyenvironment: CompanyEnvironment, orgName: string) {
        super('Rename', company);
        const parameters = new RenameEnvironmentParameters();
        parameters.EnvironmentGuid = companyenvironment.guid;
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
        super('ChangeUrlFor', company);
        const parameters = new ChangeUrlForEnvironmentParameters();
        parameters.EnvironmentGuid = companyenvironment.guid;
        parameters.OriginalUrl = orgUrl;
        parameters.Url = companyenvironment.url;
        this.Parameters = parameters;
    }
}

export class HardwareCommandParameters extends EnvironmentCommandParameters {
    HardwareGuid: string;
}

export class AddHardwareToEnvironmentParameters extends HardwareCommandParameters {
    HardwareName: string;
}

export class AddHardwareToEnvironmentCommand extends EnvironmentCommand {
    constructor(company: Company,  hardware: CompanyEnvironmentHardwareItem) {
        super('AddHardwareTo', company);
        const parameters = new AddHardwareToEnvironmentParameters();
        parameters.EnvironmentGuid = hardware.companyEnvironmentGuid;
        parameters.HardwareGuid = hardware.guid;
        parameters.HardwareName = hardware.name;
        this.Parameters = parameters;
    }
}

export class RemoveHardwareFromEnvironmentCommand extends EnvironmentCommand {

    constructor(company: Company, hardware: CompanyEnvironmentHardwareItem) {
        super('RemoveHardwareFrom', company);
        const parameters = new HardwareCommandParameters();
        parameters.EnvironmentGuid = hardware.companyEnvironmentGuid;
        parameters.HardwareGuid = hardware.guid; 
        this.Parameters = parameters;
    }
}

export class RenameHardwareParameters extends HardwareCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameHardwareCommand extends HardwareCommand {
    constructor(company: Company, hardware: CompanyEnvironmentHardwareItem, orgName: string) {
        super('Rename', company);
        const parameters = new RenameHardwareParameters();
        parameters.HardwareGuid = hardware.guid;
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
        super('ChangeIpAddressFor', company);
        const parameters = new ChangeIPAddressForHardwareParameters();
        parameters.HardwareGuid = hardware.guid;
        parameters.EnvironmentGuid = hardware.companyEnvironmentGuid;
        parameters.OriginalIPAddress = orgIp;
        parameters.IPAddress = hardware.ipAddress;
        this.Parameters = parameters;
    }
}

export class DatabaseCommandParameters extends EnvironmentCommandParameters {
    DatabaseGuid: string;
}
export class AddDatabaseToEnvironmentParameters extends DatabaseCommandParameters {
    DatabaseName: string;
}

export class AddDatabaseToEnvironmentCommand extends EnvironmentCommand {
    constructor(company: Company,  database: Database) {
        super('AddDatabaseTo', company);
        const parameters = new AddDatabaseToEnvironmentParameters();
        parameters.EnvironmentGuid = database.companyEnvironmentGuid;
        parameters.DatabaseGuid = database.guid;
        parameters.DatabaseName = database.name;
        this.Parameters = parameters;
    }
}

export class RemoveDatabaseFromEnvironmentCommand extends EnvironmentCommand {

    constructor(company: Company, database: Database) {
        super('RemoveDatabaseFrom', company);
        const parameters = new DatabaseCommandParameters();
        parameters.EnvironmentGuid = database.companyEnvironmentGuid;
        parameters.DatabaseGuid = database.guid; 
        this.Parameters = parameters;
    }
}

export class RenameDatabaseParameters extends DatabaseCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameDatabaseCommand extends DatabaseCommand {
    constructor(company: Company, database: Database, orgName: string) {
        super('Rename', company);
        const parameters = new RenameDatabaseParameters();
        parameters.DatabaseGuid = database.guid;
        parameters.EnvironmentGuid = database.companyEnvironmentGuid;
        parameters.OriginalName = orgName;
        parameters.Name = database.name;
        this.Parameters = parameters;
    }
}


export class AccountCommandParameters extends EnvironmentCommandParameters {
    AccountGuid: string;
}
export class AddAccountToEnvironmentParameters extends AccountCommandParameters {
    AccountName: string;
}

export class AddAccountToEnvironmentCommand extends EnvironmentCommand {
    constructor(company: Company,  account: Account) {
        super('AddAccountTo', company);
        const parameters = new AddAccountToEnvironmentParameters();
        parameters.EnvironmentGuid = account.companyEnvironmentGuid;
        parameters.AccountGuid = account.guid;
        parameters.AccountName = account.name;
        this.Parameters = parameters;
    }
}

export class RemoveAccountFromEnvironmentCommand extends EnvironmentCommand {

    constructor(company: Company, account: Account) {
        super('RemoveAccountFrom', company);
        const parameters = new AccountCommandParameters();
        parameters.EnvironmentGuid = account.companyEnvironmentGuid;
        parameters.AccountGuid = account.guid; 
        this.Parameters = parameters;
    }
}

export class RenameAccountParameters extends AccountCommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameAccountCommand extends AccountCommand {
    constructor(company: Company, account: Account, orgName: string) {
        super('Rename', company);
        const parameters = new RenameAccountParameters();
        parameters.AccountGuid = account.guid;
        parameters.EnvironmentGuid = account.companyEnvironmentGuid;
        parameters.OriginalName = orgName;
        parameters.Name = account.name;
        this.Parameters = parameters;
    }
}