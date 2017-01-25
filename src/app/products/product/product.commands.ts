import { Command, CommandParameters } from '../../commands/command';
import { Product } from '../product';
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
        let parameters = new CreateProductParameters();
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
        let parameters = new RenameProductParameters();
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
        let parameters = new ChangeDescriptionOfProductParameters();
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
        let parameters = new ChangeBusinessCaseOfProductParameters();
        parameters.BusinessCase = product.businessCase;
        this.Parameters = parameters;
    }
}
