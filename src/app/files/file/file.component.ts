import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { File } from '../file';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {

  file: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FilesService
  ){}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.service.getFile(params['fileId']))
    .subscribe((file: File) => this.file = file);
  }

}
