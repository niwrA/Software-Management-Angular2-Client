import { Command, CommandParameters } from '../../commands/command';
import { File } from '../file';
export class FileCommand extends Command {
    constructor(name: string, file: File) {
        super(name, 'File', file.guid);
    };
}

export class CreateFileParameters extends CommandParameters {
    ForGuid: string;
    Url: string;
    Name: string;
}

export class CreateFileCommand extends FileCommand {
    constructor(file: File) {
        super('Create', file);
        const parameters = new CreateFileParameters();
        parameters.Name = file.name;
        parameters.Url = file.url;
        parameters.ForGuid = file.forGuid;
        this.Parameters = parameters;
    }
}

export class DeleteFileCommand extends FileCommand {
    constructor(file: File) {
        super('Delete', file);
    }
}

export class RenameFileParameters extends CommandParameters {
    Name: string;
    OriginalName: string;
}

export class RenameFileCommand extends FileCommand {
    constructor(file: File, orgName: string) {
        super('Rename', file);
        const parameters = new RenameFileParameters();
        parameters.OriginalName = orgName;
        parameters.Name = file.name;
        this.Parameters = parameters;
    }
}

// move to folder
// export class ChangeUrlForFileParameters extends CommandParameters {
//     Url: string;
//     OriginalUrl: string;
// }
// export class ChangeUrlForFileCommand extends FileCommand {
//     constructor(file: File, orgUrl: string) {
//         super('ChangeUrlFor', file);
//         const parameters = new ChangeUrlForFileParameters();
//         parameters.OriginalUrl = orgUrl;
//         parameters.Url = file.url;
//         this.Parameters = parameters;
//     }
// }
