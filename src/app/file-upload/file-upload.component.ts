import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute, Params, UrlSegment, RouterStateSnapshot, RouterState } from '@angular/router';
import { FilesService } from '../files/files.service';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
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
    this.snapshot  = this.state.snapshot;
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
    const options: FileUploaderOptions = {autoUpload: true, removeAfterUpload: true};
    this.uploader.setOptions(options);
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => { 
      // todo: create command here, probably, instead of in backend
      this.filesService.refreshFiles();
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
