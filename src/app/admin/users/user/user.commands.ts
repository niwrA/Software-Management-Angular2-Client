import { Command, CommandParameters } from '../../../commands/command';
import { User } from '../user';
export class UserCommand extends Command {
    constructor(name: string, user: User) {
        super(name, 'User', user.guid);
    };
}

export class CreateUserParameters extends CommandParameters {
    Name: string;
}
export class CreateUserCommand extends UserCommand {
    constructor(user: User) {
        super('Create', user);
        const parameters = new CreateUserParameters();
        parameters.Name = user.name;
        this.Parameters = parameters;
    }
}

export class DeleteUserCommand extends UserCommand {
    constructor(user: User) {
        super('Delete', user);
    }
}


export class RenameUserParameters extends CommandParameters {
    Name: string;
    OriginalName: string;
}
export class RenameUserCommand extends UserCommand {
    constructor(user: User, orgName: string) {
        super('Rename', user);
        const parameters = new RenameUserParameters();
        parameters.OriginalName = orgName;
        parameters.Name = user.name;
        this.Parameters = parameters;
    }
}

export class ChangeEmailForUserParameters extends CommandParameters {
    Email: string;
    OriginalEmail: string;
}
export class ChangeEmailForUserCommand extends UserCommand {
    constructor(user: User, orgEmail: string) {
        super('ChangeEmailFor', user);
        const parameters = new ChangeEmailForUserParameters();
        parameters.OriginalEmail = orgEmail;
        parameters.Email = user.email;
        this.Parameters = parameters;
    }
}
