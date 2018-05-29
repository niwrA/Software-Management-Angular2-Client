
import {switchMap} from 'rxjs/operators';

import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { File } from '../file';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @Input()
  file: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FilesService
  ) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.service.getFile(params['fileId'])))
      .subscribe((file: File) => this.update(file));
  }
  update(newValue) {
    if (newValue) {
      this.file = newValue;
    }
  }
  getFile(fileId: string) {
    if (fileId && fileId.length > 0) {
      this.service.getFile(fileId)
        .then((file: File) => this.file = file);
    }
  }
}
