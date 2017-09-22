import { Command, CommandParameters } from '../../commands/command';
import { Product } from '../product';
import { ProductVersion } from '../productversions/productversion';
import { ProductFeature } from '../productfeatures/productfeature';
import { ProductIssue } from '../productissues/productissue';

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

export class AddVersionToProductCommandParameters extends CommandParameters {
    Name: string;
    Major: number;
    Minor: number;
    Revision: number;
    Build: number;
    ProductVersionGuid: string;
}

export class AddVersionToProductCommand extends ProductCommand {
    constructor(product: Product, productversion: ProductVersion) {
        super('AddVersionTo',product);
        const parameters = new AddVersionToProductCommandParameters();
        parameters.Name = productversion.name;
        parameters.Major = productversion.major;
        parameters.Minor = productversion.minor;
        parameters.Revision = productversion.revision;
        parameters.Build = productversion.build;
        parameters.ProductVersionGuid = productversion.guid;
        this.Parameters = parameters;
    }
}

export class ProductFeatureCommand extends Command {
    constructor(name: string, productFeature: ProductFeature) {
        super(name, 'ProductFeature', productFeature.guid);
    };
}

export class ProductIssueCommand extends Command {
    constructor(name: string, productIssue: ProductIssue) {
        super(name, 'ProductIssue', productIssue.guid);
    };
}

export class AddFeatureToProductParameters extends CommandParameters {
    Name: string;
    ProductFeatureGuid: string;
    FirstVersionGuid: string;
}
export class AddFeatureToProductCommand extends ProductCommand {
    constructor(product: Product, productFeature: ProductFeature) {
        super('AddFeatureTo', product);
        const parameters = new AddFeatureToProductParameters();
        parameters.Name = productFeature.name;
        parameters.ProductFeatureGuid = productFeature.guid;
        parameters.FirstVersionGuid = productFeature.firstVersionGuid;
        this.Parameters = parameters;
    }
}
export class RequestFeatureForProductParameters extends CommandParameters {
    Name: string;
    ProductFeatureGuid: string;
    RequestedForVersionGuid: string;
}

export class RequestFeatureForProductCommand extends ProductCommand {
    constructor(product: Product, productFeature: ProductFeature) {
        super('RequestFeatureFor', product);
        const parameters = new RequestFeatureForProductParameters();
        parameters.Name = productFeature.name;
        parameters.ProductFeatureGuid = productFeature.guid;
        parameters.RequestedForVersionGuid = productFeature.requestedForVersionGuid;
        this.Parameters = parameters;
    }
}

export class RemoveFeatureFromProductParameters extends CommandParameters {
    ProductFeatureGuid: string;
}

export class RemoveFeatureFromProductCommand extends ProductCommand {
    constructor(product: Product, productFeature: ProductFeature) {
        super('RemoveFeatureFrom', product);
        const parameters = new RemoveFeatureFromProductParameters();
        parameters.ProductFeatureGuid = productFeature.guid;
        this.Parameters = parameters;
    }
}

export class RemoveIssueFromProductParameters extends CommandParameters {
    ProductIssueGuid: string;
}

export class RemoveIssueFromProductCommand extends ProductCommand {
    constructor(product: Product, productIssue: ProductIssue) {
        super('RemoveIssueFrom', product);
        const parameters = new RemoveIssueFromProductParameters();
        parameters.ProductIssueGuid = productIssue.guid;
        this.Parameters = parameters;
    }
}

export class AddIssueToProductParameters extends CommandParameters {
    Name: string;
    ProductIssueGuid: string;
    FirstVersionGuid: string;
    FirstVersionSequence: number;
}

export class AddIssueToProductCommand extends ProductCommand {
    constructor(product: Product, productIssue: ProductIssue) {
        super('AddIssueTo', product);
        const parameters = new AddIssueToProductParameters();
        parameters.Name = productIssue.name;
        parameters.ProductIssueGuid = productIssue.guid;
        parameters.FirstVersionGuid = productIssue.firstVersionGuid;
        parameters.FirstVersionSequence = productIssue.firstVersionSequence;
        this.Parameters = parameters;
    }
}


export class RemoveVersionFromProductParameters extends CommandParameters {
    ProductVersionGuid: string;
}

export class RemoveVersionFromProductCommand extends ProductCommand {
    constructor(product: Product, productVersion: ProductVersion) {
        super('RemoveVersionFrom', product);
        const parameters = new RemoveVersionFromProductParameters();
        parameters.ProductVersionGuid = productVersion.guid;
        this.Parameters = parameters;
    }
}

export class ProductFeatureParameters extends CommandParameters {
    ProductGuid: string;
}

export class RenameProductFeatureParameters extends ProductFeatureParameters {
    Name: string;
    OriginalName: string;
}

export class RenameProductFeatureCommand extends ProductFeatureCommand {
    constructor(productFeature: ProductFeature, orgName: string) {
        super('Rename', productFeature);
        const parameters = new RenameProductFeatureParameters();
        parameters.OriginalName = orgName;
        parameters.Name = productFeature.name;
        parameters.ProductGuid = productFeature.productGuid;
        this.Parameters = parameters;
    }
}
export class ProductIssueParameters extends CommandParameters {
    ProductGuid: string;
}

export class RenameProductIssueParameters extends ProductIssueParameters {
    Name: string;
    OriginalName: string;
}

export class RenameProductIssueCommand extends ProductIssueCommand {
    constructor(productIssue: ProductIssue, orgName: string) {
        super('Rename', productIssue);
        const parameters = new RenameProductIssueParameters();
        parameters.OriginalName = orgName;
        parameters.Name = productIssue.name;
        parameters.ProductGuid = productIssue.productGuid;
        this.Parameters = parameters;
    }
}


// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfProductIssueParameters extends ProductIssueParameters {
    Description: string;
}

export class ChangeDescriptionOfProductIssueCommand extends ProductIssueCommand {
    constructor(productIssue: ProductIssue) {
        super('ChangeDescriptionOf', productIssue);
        const parameters = new ChangeDescriptionOfProductIssueParameters();
        parameters.Description = productIssue.description;
        parameters.ProductGuid = productIssue.productGuid;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfProductFeatureParameters extends ProductFeatureParameters {
    Description: string;
}

export class ChangeDescriptionOfProductFeatureCommand extends ProductFeatureCommand {
    constructor(productFeature: ProductFeature) {
        super('ChangeDescriptionOf', productFeature);
        const parameters = new ChangeDescriptionOfProductFeatureParameters();
        parameters.Description = productFeature.description;
        parameters.ProductGuid = productFeature.productGuid;
        this.Parameters = parameters;
    }
}