import { Command, CommandParameters } from '../../commands/command';
import { Company } from '../company';
import { CompanyRole } from '../company/companyroles/companyrole';
import { CompanyEnvironment } from '../company/companyenvironments/companyenvironment';

export class CompanyCommand extends Command {
    constructor(name: string, company: Company) {
        super(name, 'Company', company.guid);
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

export class AddEnvironmentToCompanyParameters extends CommandParameters {
    EnvironmentGuid: string;
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

export class RemoveEnvironmentFromCompanyParameters extends CommandParameters {
    EnvironmentGuid: string;
}

export class RemoveEnvironmentFromCompanyCommand extends CompanyCommand {

    constructor(company: Company, environmentGuid: string) {
        super('RemoveEnvironmentFrom', company);
        const parameters = new RemoveEnvironmentFromCompanyParameters();
        parameters.EnvironmentGuid = environmentGuid;
        this.Parameters = parameters;
    }
}

export class RenameEnvironmentForCompanyParameters extends CommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameEnvironmentForCompanyCommand extends CompanyCommand {
    constructor(company: Company, companyenvironment: CompanyEnvironment, orgName: string) {
        super('RenameEnvironmentFor', company);
        const parameters = new RenameEnvironmentForCompanyParameters();
        parameters.OriginalName = orgName;
        parameters.Name = companyenvironment.name;
        this.Parameters = parameters;
    }
}
