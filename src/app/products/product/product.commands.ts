import { Command, CommandParameters } from '../../commands/command';
import { Product } from '../product';
import { ProductVersion } from '../productversions/productversion';

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
