import { Command, CommandParameters } from '../../commands/command';
import { Product } from '../product';
import { ProductVersion } from '../productversions/productversion';
import { ProductFeature } from '../productfeatures/productfeature';
import { ProductIssue } from '../productissues/productissue';
import { ProductConfigOption } from '../productconfigoptions/productconfigoption';

export class ProductCommand extends Command {
    constructor(name: string, product: Product) {
        super(name, 'Product', product.guid);
    };
}

export class CreateProductParameters extends CommandParameters {
    Name: string;
}
export class CreateProductCommand extends ProductCommand {
    constructor(product: Product) {
        super('Create', product);
        const parameters = new CreateProductParameters();
        parameters.Name = product.name;
        this.Parameters = parameters;
    }
}

export class DeleteProductCommand extends ProductCommand {
    constructor(product: Product) {
        super('Delete', product);
    }
}

export class RenameProductParameters extends CommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameProductCommand extends ProductCommand {
    constructor(product: Product, orgName: string) {
        super('Rename', product);
        const parameters = new RenameProductParameters();
        parameters.OriginalName = orgName;
        parameters.Name = product.name;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfProductParameters extends CommandParameters {
    Description: string;
}

export class ChangeDescriptionOfProductCommand extends ProductCommand {
    constructor(product: Product) {
        super('ChangeDescriptionOf', product);
        const parameters = new ChangeDescriptionOfProductParameters();
        parameters.Description = product.description;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeBusinessCaseOfProductParameters extends CommandParameters {
    BusinessCase: string;
}

export class ChangeBusinessCaseOfProductCommand extends ProductCommand {
    constructor(product: Product) {
        super('ChangeBusinessCaseOf', product);
        const parameters = new ChangeBusinessCaseOfProductParameters();
        parameters.BusinessCase = product.businessCase;
        this.Parameters = parameters;
    }
}
export class ProductVersionCommand extends Command {
    constructor(name: string, productVersion: ProductVersion, product: Product) {
        super(name, 'ProductVersion', productVersion.guid, 'Product', product.guid);
    };
}
export class AddVersionToProductCommandParameters extends CommandParameters {
    Name: string;
    Major: number;
    Minor: number;
    Revision: number;
    Build: number;
}

export class AddVersionToProductCommand extends ProductVersionCommand {
    constructor(product: Product, productversion: ProductVersion) {
        super('Add', productversion, product);
        const parameters = new AddVersionToProductCommandParameters();
        parameters.Name = productversion.name;
        parameters.Major = productversion.major;
        parameters.Minor = productversion.minor;
        parameters.Revision = productversion.revision;
        parameters.Build = productversion.build;
        this.Parameters = parameters;
    };
}

export class ProductFeatureCommand extends Command {
    constructor(name: string, productFeature: ProductFeature, product: Product) {
        super(name, 'ProductFeature', productFeature.guid, 'Product', product.guid);
    };
}

export class ProductIssueCommand extends Command {
    constructor(name: string, productIssue: ProductIssue, product: Product) {
        super(name, 'ProductIssue', productIssue.guid, 'Product', product.guid);
    };
}

export class ProductConfigOptionCommand extends Command {
    constructor(name: string, productFeature: ProductConfigOption, product: Product) {
        super(name, 'ProductConfigOption', productFeature.guid, 'Product', product.guid);
    };
}

export class AddFeatureToProductParameters extends CommandParameters {
    Name: string;
    FirstVersionGuid: string;
}
export class AddFeatureToProductCommand extends ProductFeatureCommand {
    constructor(product: Product, productFeature: ProductFeature) {
        super('Add', productFeature, product);
        const parameters = new AddFeatureToProductParameters();
        parameters.Name = productFeature.name;
        parameters.FirstVersionGuid = productFeature.firstVersionGuid;
        this.Parameters = parameters;
    }
}
export class RequestFeatureForProductParameters extends CommandParameters {
    Name: string;
    RequestedForVersionGuid: string;
}

export class RequestFeatureForProductCommand extends ProductFeatureCommand {
    constructor(product: Product, productFeature: ProductFeature) {
        super('Request', productFeature, product);
        const parameters = new RequestFeatureForProductParameters();
        parameters.Name = productFeature.name;
        parameters.RequestedForVersionGuid = productFeature.requestedForVersionGuid;
        this.Parameters = parameters;
    }
}

export class RemoveFeatureFromProductParameters extends CommandParameters {
}

export class RemoveFeatureFromProductCommand extends ProductFeatureCommand {
    constructor(product: Product, productFeature: ProductFeature) {
        super('Remove', productFeature, product);
        const parameters = new RemoveFeatureFromProductParameters();
        this.Parameters = parameters;
    }
}

export class RemoveIssueFromProductParameters extends CommandParameters {
}

export class RemoveIssueFromProductCommand extends ProductIssueCommand {
    constructor(product: Product, productIssue: ProductIssue) {
        super('Remove', productIssue, product);
        const parameters = new RemoveIssueFromProductParameters();
        this.Parameters = parameters;
    }
}

export class AddIssueToProductParameters extends CommandParameters {
    Name: string;
    FirstVersionGuid: string;
    FirstVersionSequence: number;
}

export class AddIssueToProductCommand extends ProductIssueCommand {
    constructor(product: Product, productIssue: ProductIssue) {
        super('Add', productIssue, product);
        const parameters = new AddIssueToProductParameters();
        parameters.Name = productIssue.name;
        parameters.FirstVersionGuid = productIssue.firstVersionGuid;
        parameters.FirstVersionSequence = productIssue.firstVersionSequence;
        this.Parameters = parameters;
    }
}


export class AddConfigOptionToProductParameters extends CommandParameters {
    Name: string;
    FeatureGuid: string;
}

export class AddConfigOptionToProductCommand extends ProductConfigOptionCommand {
    constructor(product: Product, productFeature: ProductFeature, configoption: ProductConfigOption) {
        super('Add', configoption, product);
        const parameters = new AddConfigOptionToProductParameters();
        parameters.Name = configoption.name;
        parameters.FeatureGuid = configoption.productFeatureGuid;
        this.Parameters = parameters;
    }
}

export class AddChildToProductConfigOptionParameters extends CommandParameters {
    Name: string;
    FeatureGuid: string;
    ParentGuid: string;
}

export class AddChildToProductConfigOptionCommand extends ProductConfigOptionCommand {
    constructor(configoption: ProductConfigOption, product: Product) {
        super('AddChildTo', configoption, product);
        const parameters = new AddChildToProductConfigOptionParameters();
        parameters.Name = configoption.name;
        parameters.FeatureGuid = configoption.productFeatureGuid;
        parameters.ParentGuid = configoption.parentGuid;
        this.Parameters = parameters;
    }
}

export class RemoveChildFromProductConfigOptionParameters extends CommandParameters {
    ChildGuid: string;
}

export class RemoveChildFromProductConfigOptionCommand extends ProductConfigOptionCommand {
    constructor(configoption: ProductConfigOption, parent: ProductConfigOption, product: Product) {
        super('RemoveChildFrom', parent, product);
        const parameters = new RemoveChildFromProductConfigOptionParameters();
        parameters.ChildGuid = configoption.guid;
        this.Parameters = parameters;
    }
}

export class RemoveVersionFromProductCommand extends ProductVersionCommand {
    constructor(product: Product, productVersion: ProductVersion) {
        super('Remove', productVersion, product);
    }
}

export class RemoveConfigOptionFromProductParameters extends CommandParameters {
    ConfigGuid: string;
}

export class RemoveConfigOptionFromProductFeatureCommand extends ProductCommand {
    constructor(product: Product, configoption: ProductConfigOption) {
        super('Remove', product);
        const parameters = new RemoveConfigOptionFromProductParameters();
        parameters.ConfigGuid = configoption.guid;
        this.Parameters = parameters;
    }
}

export class ProductFeatureParameters extends CommandParameters {
}
export class ProductConfigOptionParameters extends CommandParameters {
}

export class RenameProductFeatureParameters extends ProductFeatureParameters {
    Name: string;
    OriginalName: string;
}

export class RenameProductFeatureCommand extends ProductFeatureCommand {
    constructor(productFeature: ProductFeature, product: Product, orgName: string) {
        super('Rename', productFeature, product);
        const parameters = new RenameProductFeatureParameters();
        parameters.OriginalName = orgName;
        parameters.Name = productFeature.name;
        this.Parameters = parameters;
    }
}
export class ProductIssueParameters extends CommandParameters {
}

export class RenameProductIssueParameters extends ProductIssueParameters {
    Name: string;
    OriginalName: string;
}

export class RenameProductIssueCommand extends ProductIssueCommand {
    constructor(productIssue: ProductIssue, product: Product, orgName: string) {
        super('Rename', productIssue, product);
        const parameters = new RenameProductIssueParameters();
        parameters.OriginalName = orgName;
        parameters.Name = productIssue.name;
        this.Parameters = parameters;
    }
}

export class RenameProductConfigOptionCommandParameters extends ProductConfigOptionParameters {
    Name: string;
    OriginalName: string;
}

export class RenameProductConfigOptionCommand extends ProductConfigOptionCommand {
    constructor(productConfigOption: ProductConfigOption, product: Product, orgName: string) {
        super('Rename', productConfigOption, product);
        const parameters = new RenameProductConfigOptionCommandParameters();
        parameters.OriginalName = orgName;
        parameters.Name = productConfigOption.name;
        this.Parameters = parameters;
    }
}
export class ChangeDefaultValueForProductConfigOptionCommandParameters extends ProductConfigOptionParameters {
    DefaultValue: string;
    OriginalDefaultValue: string;
}

export class ChangeDefaultValueForProductConfigOptionCommand extends ProductConfigOptionCommand {
    constructor(productConfigOption: ProductConfigOption, product: Product, orgValue: string) {
        super('ChangeDefaultValueFor', productConfigOption, product);
        const parameters = new ChangeDefaultValueForProductConfigOptionCommandParameters();
        parameters.OriginalDefaultValue = orgValue;
        parameters.DefaultValue = productConfigOption.defaultValue;
        this.Parameters = parameters;
    }
}

export class ChangeDescriptionOfProductConfigOptionCommandParameters extends ProductConfigOptionParameters {
    Description: string;
}

export class ChangeDescriptionOfProductConfigOptionCommand extends ProductConfigOptionCommand {
    constructor(productConfigOption: ProductConfigOption, product: Product) {
        super('ChangeDescriptionOf', productConfigOption, product);
        const parameters = new ChangeDescriptionOfProductConfigOptionCommandParameters();
        parameters.Description = productConfigOption.description;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfProductIssueParameters extends ProductIssueParameters {
    Description: string;
}

export class ChangeDescriptionOfProductIssueCommand extends ProductIssueCommand {
    constructor(productIssue: ProductIssue, product: Product) {
        super('ChangeDescriptionOf', productIssue, product);
        const parameters = new ChangeDescriptionOfProductIssueParameters();
        parameters.Description = productIssue.description;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfProductFeatureParameters extends ProductFeatureParameters {
    Description: string;
}

export class ChangeDescriptionOfProductFeatureCommand extends ProductFeatureCommand {
    constructor(productFeature: ProductFeature, product: Product) {
        super('ChangeDescriptionOf', productFeature, product);
        const parameters = new ChangeDescriptionOfProductFeatureParameters();
        parameters.Description = productFeature.description;
        this.Parameters = parameters;
    }
}
