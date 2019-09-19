import { Component, OnInit, Inject } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isChecked: boolean = false;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.isChecked = this.storage.get('notifySettings');
  }

  onChange(value: MatSlideToggleChange) {
    this.isChecked = value.checked;
    this.storage.set('notifySettings', value.checked);
  }
}
