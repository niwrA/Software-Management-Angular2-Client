import { Command, CommandParameters } from '../../commands/command';
import { ProductInstallation } from '../productinstallation';
export class ProductInstallationCommand extends Command {
    constructor(name: string, productinstallation: ProductInstallation) {
        super(name, 'ProductInstallation', productinstallation.guid);
    };
}

export class CreateProductInstallationParameters extends CommandParameters {
    CompanyGuid: string;
    CompanyEnvironmentGuid: string;
    ProductGuid: string;
    ProductVersionGuid: string;
}
export class CreateProductInstallationCommand extends ProductInstallationCommand {
    constructor(productinstallation: ProductInstallation) {
        super('Create', productinstallation);
        const parameters = new CreateProductInstallationParameters();
        parameters.CompanyGuid = productinstallation.companyGuid;
        parameters.CompanyEnvironmentGuid = productinstallation.companyEnvironmentGuid;
        parameters.ProductGuid = productinstallation.productGuid;
        parameters.ProductVersionGuid = productinstallation.productVersionGuid;
        // parameters.CompanyName = productinstallation.contactName;
        this.Parameters = parameters;
    }
}

export class DeleteProductInstallationCommand extends ProductInstallationCommand {
    constructor(productinstallation: ProductInstallation) {
        super('Delete', productinstallation);
    }
}

export class ChangeStartDateParameters extends CommandParameters {
    StartDate?: string;
    OriginalStartDate?: string;
}
export class ChangeStartDateOfProductInstallationCommand extends ProductInstallationCommand {

    constructor(productinstallation: ProductInstallation, orgStartDate?: string) {
        super('ChangeStartDateOf', productinstallation);
        const parameters = new ChangeStartDateParameters();
        parameters.OriginalStartDate = orgStartDate;
        parameters.StartDate = productinstallation.startDate;
        this.Parameters = parameters;
    }
}

export class ChangeEndDateParameters extends CommandParameters {
    EndDate?: string;
    OriginalEndDate?: string;
}
export class ChangeEndDateOfProductInstallationCommand extends ProductInstallationCommand {
    constructor(productinstallation: ProductInstallation, orgEndDate?: string) {
        super('ChangeEndDateOf', productinstallation);
        const parameters = new ChangeEndDateParameters();
        parameters.OriginalEndDate = orgEndDate;
        parameters.EndDate = productinstallation.endDate;
        this.Parameters = parameters;
    }
}

export class ChangeExternalIdParameters extends CommandParameters {
    ExternalId?: string;
    OriginalExternalId?: string;
}
export class ChangeExternalIdOfProductInstallationCommand extends ProductInstallationCommand {
    constructor(productinstallation: ProductInstallation, orgExternalId?: string) {
        super('ChangeEndDateOf', productinstallation);
        const parameters = new ChangeExternalIdParameters();
        parameters.OriginalExternalId = orgExternalId;
        parameters.ExternalId = productinstallation.externalId;
        this.Parameters = parameters;
    }
}