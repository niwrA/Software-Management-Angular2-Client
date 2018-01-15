
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterStateSnapshot } from '@angular/router';
import { CommandsService } from './commands.service';
import { Command, CommandReadOnly } from './command';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'lodash';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {
  private _forGuid: string;
  @Input()
  set forGuid(guid: string) {
    this._forGuid = guid;
    this.service.getCommandsForGuid(guid).then(commands => this.updateCommands(commands));
  }
  get companyroleguid() { return this._forGuid; }

  @Input() commands = new Array<CommandReadOnly>();
  @Input() allCommands = new Array<CommandReadOnly>();
  @Input() selectedCommands = new Array<CommandReadOnly>();
  @Input() canAdd = false;
  snapshot: RouterStateSnapshot;
  selectedCommand: CommandReadOnly;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CommandsService,
    private sanitizer: DomSanitizer
  ) {
    this.snapshot = router.routerState.snapshot;
  }

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => this.getCommandsForGuid(params['forId']));
    if (this.snapshot && this.snapshot.url && this.snapshot.url.length > 1) {
      const url = this.snapshot.url.split('/');
      const maxIndex = url.length - 1;
      if (maxIndex > 1) {
        this._forGuid = url[maxIndex - 1].toString();
        this.getCommandsForGuid(this._forGuid);
      }
    }
  }

  onSelect(command: CommandReadOnly): void {
    this.selectedCommand = command;
  }

  clearSelection(): void {
    this.selectedCommand = null;
  }

  getCommandsForGuid(forGuid: string): void {
    this.forGuid = forGuid;
  }

  filterCommands(): void {
    if (this.searchText && this.searchText.length > 0) {
      this.commands = _.filter<CommandReadOnly>
        (this.allCommands, prj => prj.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
          || prj.parametersJson.indexOf(this.searchText) > -1);
    } else { this.commands = this.allCommands; }
  }

  updateCommands(commands: Array<CommandReadOnly>): void {
    this.allCommands = commands;
    this.filterCommands();
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }
}
