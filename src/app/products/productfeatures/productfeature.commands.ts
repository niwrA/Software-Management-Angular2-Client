import { Command, CommandParameters } from '../../commands/command';
import { ProductFeature } from './productfeature';

export class ProductFeatureCommand extends Command {
    constructor(name: string, productFeature: ProductFeature) {
        super(name, 'ProductFeature', productFeature.guid);
    };
}

export class CreateProductFeatureParameters extends CommandParameters {
    Name: string;
}
export class CreateProductFeatureCommand extends ProductFeatureCommand {
    constructor(productFeature: ProductFeature) {
        super('Create', productFeature);
        const parameters = new CreateProductFeatureParameters();
        parameters.Name = productFeature.name;
        this.Parameters = parameters;
    }
}

export class DeleteProductFeatureCommand extends ProductFeatureCommand {
    constructor(productFeature: ProductFeature) {
        super('Delete', productFeature);
    }
}

export class RenameProductFeatureParameters extends CommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameProductFeatureCommand extends ProductFeatureCommand {
    constructor(productFeature: ProductFeature, orgName: string) {
        super('Rename', productFeature);
        const parameters = new RenameProductFeatureParameters();
        parameters.OriginalName = orgName;
        parameters.Name = productFeature.name;
        this.Parameters = parameters;
    }
}

// todo: support exact inserts, deletes etc.
export class ChangeDescriptionOfProductFeatureParameters extends CommandParameters {
    Description: string;
}

export class ChangeDescriptionOfProductFeatureCommand extends ProductFeatureCommand {
    constructor(productFeature: ProductFeature) {
        super('ChangeDescriptionOf', productFeature);
        const parameters = new ChangeDescriptionOfProductFeatureParameters();
        parameters.Description = productFeature.description;
        this.Parameters = parameters;
    }
}