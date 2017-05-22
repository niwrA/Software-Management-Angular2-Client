import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FileItem } from 'ng2-file-upload';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class FileUploadService {
  commands = new Array<File>();
  postedCommands = new Array<File>();
  private headers = new Headers({ 'Content-Type': 'application/json' });
  fileUploadUrl = '';
  constructor(private http: Http, private notificationsService: NotificationsService) {
  }

  PostFile(file: FileItem, replaceOriginal: Boolean): Promise<any> {
    return this.http.post(this.fileUploadUrl, JSON.stringify(file),
      { headers: this.headers }).toPromise().then(results => this.processResults(results,
        this.commands, this.postedCommands, this.notificationsService))
      .catch(error => this.handleError(error, this.notificationsService));
  }

  private processResults(results: any, commands: Array<File>, postedCommands: Array<File>,
    notificationService: NotificationsService) {
    const batchresult = results.json(); // todo: as filebatchresult
    if (batchresult.success) {
      console.log(batchresult.executedCommands.length + ' project command(s) posted successfully');
      for (const command of commands) {
        postedCommands.push(command);
        commands.splice(0);
        notificationService.success(command.name,
          command.name + ' posted successfully', { timeOut: 3000, clickToClose: true });
      }
    } else {
      notificationService.error('An error occurred', batchresult.message, { timeOut: 5000, clickToClose: true });
      // return Promise.reject(batchresult.message || batchresult);
    }
  }

  private handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('A connection error occurred', error);
    notificationService.error('A connection error occurred', error, { timeOut: 5000, clickToClose: true });
    return Promise.reject(error.message || error);
  }
}
