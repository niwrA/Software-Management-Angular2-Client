import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ui-menu',
  templateUrl: './ui-menu.component.html',
  styleUrls: ['./ui-menu.component.css']
})
export class UiMenuComponent implements OnInit {
  selected: string;
  @Input() menuitems: Array<string>;
    iconItems = [
    {text: 'Redial', icon: 'dialpad'},
    {text: 'Check voicemail', icon: 'voicemail', disabled: true},
    {text: 'Disable alerts', icon: 'notifications_off'}
  ];

  ngOnInit() {
  }

  select(text: string) { this.selected = text; }
}
