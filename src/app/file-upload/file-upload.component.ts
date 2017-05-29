import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute, Params, UrlSegment, RouterStateSnapshot, RouterState } from '@angular/router';
import { FilesService } from '../files/files.service';
import { File as SMFile, FileState } from '../files/file';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  @Input()
  public files: Array<SMFile>;
  fileUploadUrl = environment.fileUploadUrl;
  forEntityGuid: string;
  forEntityType: string;
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  snapshot: RouterStateSnapshot;
  state: RouterState;
  constructor(private route: Router, private filesService: FilesService) {
    this.state = route.routerState;
    this.snapshot = this.state.snapshot;
  }

  ngOnInit() {

    if (this.snapshot && this.snapshot.url && this.snapshot.url.length > 1) {
      const url = this.snapshot.url.split('/');
      this.forEntityType = url[1].toString();
      this.forEntityGuid = url[2].toString();
      this.initFileProperties(this.forEntityGuid, this.forEntityType);
    }
  }
  initFileProperties(forId: string, forEntity: string) {

    this.uploader = new FileUploader({ url: this.fileUploadUrl + '/' + forEntity + '/' + forId });
    const options: FileUploaderOptions = { autoUpload: true, removeAfterUpload: true };
    this.uploader.setOptions(options);
    this.uploader.onCompleteItem = (item: FileItem, response: any, status: any, headers: any) => {
      if (!this.files) { this.files = new Array<SMFile>(); }

      // this is done in case a component is displaying a list of files and this should be added to the displayed files
      // todo: insert on top?
      const newFile = new SMFile();
      const fileState = new FileState();
      fileState.fileName = item.file.name;
      fileState.name = item.file.name;
      fileState.contentType = item.file.type;
      fileState.size = item.file.size;
      // fileState.type = item.file.type; // todo: add contenttype and size, will be useful
      const file = this.filesService.createFile(true, item.file.name, item.file.type, item.file.size, this.forEntityGuid, this.forEntityType);
      this.files.push(file);
    };
    //    this.uploader.onBuildItemForm = function (fileItem, form) { form.append('forGuid', forId); return { fileItem, form } };
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
