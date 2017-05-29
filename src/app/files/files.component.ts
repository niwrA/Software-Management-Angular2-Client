import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterStateSnapshot } from '@angular/router';
import { FilesService } from './files.service';
import { File } from './file';
import { FilePreviewComponent } from './file/file-preview/file-preview.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MdDialog, MdDialogRef } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})

export class FilesComponent implements OnInit {
  private _forGuid: string;
  private _forType: string;
  @Input()
  set forGuid(guid: string) {
    this._forGuid = guid;
    this.service.getFilesForGuid(guid).then(files => this.updateFiles(files));
  }
  get forGuid() { return this._forGuid; }

  @Input() files = new Array<File>();
  @Input() allFiles = new Array<File>();
  @Input() selectedFiles = new Array<File>();
  @Input() canAdd = false;
  snapshot: RouterStateSnapshot;
  selectedFile: File;
  searchText: string;
  imageDialogRef: MdDialogRef<FilePreviewComponent>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FilesService,
    private dialog: MdDialog,
    private sanitizer: DomSanitizer
  ) {
    this.snapshot = router.routerState.snapshot;
  }

  ngOnInit() {
    if (this.snapshot && this.snapshot.url && this.snapshot.url.length > 1) {
      const url = this.snapshot.url.split('/');
      this._forType = url[1].toString();
      this._forGuid = url[2].toString();
      this.service.getFilesForGuid(this._forGuid).then(files => this.updateFiles(files));
    }
  }

  onSelect(file: File): void {
    this.selectedFile = file;
  }

  clearSelection(): void {
    this.selectedFile = null;
  }

  getFilesForGuid(forGuid: string): void {
    this.forGuid = forGuid;
  }

  getFiles(searchText: string): void {
    this.service.getFiles(searchText).then(files => this.updateFiles(files));
  }

  filterFiles(): void {
    if (this.searchText && this.searchText.length > 0) {
      this.files = _.filter<File>(this.allFiles, prj => prj.name.indexOf(this.searchText) > -1 || prj.url.indexOf(this.searchText) > -1);
    } else { this.files = this.allFiles; }
  }

  updateFiles(files: Array<File>): void {
    this.allFiles = files;
    this.filterFiles();
  }

  createFile(url: string): void {
    //    const file = this.service.createFile(true, url, this._forGuid, this._forType);
    //    this.files.push(file);
  }

  deleteFile(file: File): void {
    this.service.deleteFile(file);
    const index = this.files.indexOf(file, 0);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }

  toggleSelect(file: File): void {
    if (!file.isSelected) {
      this.selectedFiles.push(file);
    } else {
      const index = this.selectedFiles.indexOf(file, 0);
      if (index > -1) {
        this.selectedFiles.splice(index, 1);
      }
    }
  }

  showActions(file: File): void {
    file.showActions = true;
  }

  hideActions(file: File): void {
    file.showActions = false;
  }

  zoomImage(file): void {
    this.imageDialogRef = this.dialog.open(FilePreviewComponent/*, {
      height: '400px',
      width: '600px',
    }*/);
    this.imageDialogRef.componentInstance.file = file;
  }


  // file could be video
  // isVideo(file: File): boolean {
  //   if (file.url.indexOf('youtube.') > 0) {
  //     return true;
  //   }
  //   return false;
  // }

}
