import { Command } from './command';

export class CommandBatchResult{
    success: boolean;
    executedCommands: Array<Command>;
    message: string;

}