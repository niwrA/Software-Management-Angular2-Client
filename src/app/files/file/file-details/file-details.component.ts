import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { File } from '../../file';
import { RenameFileCommand } from '../file.commands';
import { FilesService } from '../../files.service';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css']
})
export class FileDetailsComponent implements OnInit {
  file: File;
  previousFile: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FilesService
  ) { }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getFile(params['fileId']))
      .subscribe((file: File) => this.update(file));
  }

  update(newValue) {
    if (newValue) {
      this.previousFile = this.service.cloneFile(newValue);
      this.file = newValue;
    }
  }

  changeName(): void {
    if (this.previousFile !== undefined) {
      if (this.file.name !== this.previousFile.name) {
        const renameCommand = new RenameFileCommand(this.file, this.previousFile.name);
        this.service.postCommand(renameCommand, false);
        this.previousFile.name = this.file.name;
      }
    } else {
      this.previousFile = this.file;
    }
  }
}
