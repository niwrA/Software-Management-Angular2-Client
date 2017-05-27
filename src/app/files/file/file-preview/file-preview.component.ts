import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { File } from '../../file';
import { RenameFileCommand } from '../file.commands';
import { FilesService } from '../../files.service';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent implements OnInit {
  @Input()
  public file: File;

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
      this.file = newValue;
    }
  }
}
