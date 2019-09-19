import { Component } from '@angular/core';
import { Notify } from '../models/notify.model';
import { formatDate } from '@angular/common';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent {

  constructor(private httpService: HttpService, public notify: Notify) { }

  sendNotify() {
    let today = new Date();
    this.notify.Date = formatDate(today, 'medium', 'en-US');
    this.httpService.postNotify(this.notify).subscribe(res => {
      console.log(res);
    }, err => {
      console.error(err);
    });
  }
}
