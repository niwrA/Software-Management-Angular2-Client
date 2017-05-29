import { Injectable, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { File, FileState } from './file';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import { FileCommand, CreateFileCommand, DeleteFileCommand } from './file/file.commands';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class FilesService {
  filesUrl = environment.filesUrl;
  files = new Array<File>();

  constructor(private commandsService: CommandsService, private http: Http, private notificationService: NotificationsService) {
    //    this.getFiles('').then(result => this.files = result as Array<File>);
  }

  createFile(doSave: boolean, name: string, contentType: string, size: number, forGuid: string, forType: string): File {
    const newState = new FileState();

    newState.guid = UUID.UUID();
    newState.name = name;
    newState.forGuid = forGuid;
    newState.forType = forType;
    newState.fileName = name;
    newState.type = name.substring(name.lastIndexOf('.')).toLowerCase();
    newState.contentType = contentType;
    newState.size = size;

    const newItem = new File(newState);
    if (doSave) {
      this.files.splice(0, 0, newItem);
      const createFileCommand = new CreateFileCommand(newItem);
      this.commandsService.postCommand(createFileCommand, false).then(s => this.updateFile(newItem));
    }
    return newItem;
  }

  updateFile(file: File) {
    this.getFile(file.guid, true).then(s => this.updateLinkProperties(file, s));
  }

  // this may need to be changed so that the state initialisation stuff is handled and
  // readonly properties are updated
  updateLinkProperties(link: File, updated: File) {
    // may not need to actually update anything for now
  }

  deleteFile(file: File): void {
    const index = this.files.indexOf(file, 0);
    if (index > -1) {
      this.files.splice(index, 1);
    }
    this.postCommand(new DeleteFileCommand(file), false);
  }

  cloneFile(original: File): File {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }

  getFilesForGuid(forGuid: string): Promise<Array<File>> {
    return this.getFiles('').then(files => this.filterByForGuid(files, forGuid));
  }

  filterByForGuid(files: Array<File>, forGuid: string): Promise<Array<File>> {
    if (forGuid && forGuid.length > 0) {
      const results = _.filter<File>(files, prj => prj.forGuid === forGuid);
      return Promise.resolve(results);
    } else { return Promise.resolve(files); }

  }

  getFiles(searchText: string): Promise<Array<File>> {
    if (this.files.length > 0) {
      if (searchText && searchText.length > 0) {
        const results = _.filter<File>(this.files, prj => prj.name.indexOf(searchText) > -1 || prj.url.indexOf(searchText) > -1);
        return Promise.resolve(results);
      } else { return Promise.resolve(this.files); }
    } else {
      return this.http.get(this.filesUrl)
        .toPromise()
        .then(response => this.parseResponse(response, this.files))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  refreshFiles(): void {
    this.files = null;
    this.getFiles('');
  }

  parseResponse(response: any, files: Array<File>): Array<File> {
    const states = response.json() as Array<FileState>;
    files = new Array<File>();
    // todo: option to add/update
    for (const state of states) {
      files.push(new File(state));
    }
    return files;
  }

  getFile(guid: string, noCache?: boolean): Promise<File> {
    if (this.files.length > 0 && !noCache) {
      const result = _.find(this.files, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.filesUrl + '/' + guid)
        .toPromise()
        .then(response => new File(response.json() as FileState))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  postCommand(command: FileCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    notificationService.error('An error occurred', error, { timeOut: 5000, clickToClose: false });
    return Promise.reject(error.message || error);
  }
}
