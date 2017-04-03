import { Command, CommandParameters } from '../../commands/command';
import { Link } from '../link';
export class LinkCommand extends Command {
    constructor(name: string, link: Link) {
        super(name, 'Link', link.guid);
    };
}

export class CreateLinkParameters extends CommandParameters {
    ForGuid: string;
    Url: string;
    Name: string;
}
export class CreateLinkCommand extends LinkCommand {
    constructor(link: Link) {
        super('Create', link);
        const parameters = new CreateLinkParameters();
        parameters.Name = link.name;
        parameters.Url = link.url;
        parameters.ForGuid = link.linkForGuid;
        this.Parameters = parameters;
    }
}

export class DeleteLinkCommand extends LinkCommand {
    constructor(link: Link) {
        super('Delete', link);
    }
}


export class RenameLinkParameters extends CommandParameters {
    Name: string;
    OriginalName: string;
}
export class RenameLinkCommand extends LinkCommand {
    constructor(link: Link, orgName: string) {
        super('Rename', link);
        const parameters = new RenameLinkParameters();
        parameters.OriginalName = orgName;
        parameters.Name = link.name;
        this.Parameters = parameters;
    }
}

export class ChangeUrlForLinkParameters extends CommandParameters {
    Url: string;
    OriginalUrl: string;
}
export class ChangeUrlForLinkCommand extends LinkCommand {
    constructor(link: Link, orgUrl: string) {
        super('ChangeUrlFor', link);
        const parameters = new ChangeUrlForLinkParameters();
        parameters.OriginalUrl = orgUrl;
        parameters.Url = link.url;
        this.Parameters = parameters;
    }
}
