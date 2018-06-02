
import {switchMap} from 'rxjs/operators';

import { Component, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Design } from '../../design';
import { DesignsService } from '../../designs.service';
import { CommandsService } from '../../../commands/commands.service';
import { RenameDesignCommand, ChangeDescriptionOfDesignCommand } from '../../design/design.commands';

@Component({
  selector: 'app-designdetails',
  templateUrl: './designdetails.component.html',
  styleUrls: ['./designdetails.component.css']
})
export class DesignDetailsComponent implements OnInit {
  design: Design;
  previousDesign: Design;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
    private commandsService: CommandsService
  ) { }

  update(newValue) {
    this.previousDesign = this.service.cloneDesign(newValue);
    this.design = newValue;
  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => this.updateDesign(params.get('designId')));
  }

  updateDesign(designid): void {
    this.service.getDesign(designid).then((design: Design) => this.update(design))
  }
  changeName(): void {
    if (this.previousDesign !== undefined) {
      if (this.design.name !== this.previousDesign.name) {
        const renameCommand = new RenameDesignCommand(this.design, this.previousDesign.name);
        this.service.postCommand(renameCommand, false);
        this.previousDesign.name = this.design.name;
      }
    } else {
      this.previousDesign = this.design;
    }
  }

  changeDescription(): void {
    if (this.previousDesign !== undefined) {
      if (this.design.description !== this.previousDesign.description) {
        const command = new ChangeDescriptionOfDesignCommand(this.design);
        this.service.postCommand(command, false);
        this.previousDesign.description = this.design.description;
      }
    } else {
      this.previousDesign = this.design;
    }
  }
}
