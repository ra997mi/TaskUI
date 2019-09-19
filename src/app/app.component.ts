import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.startSignalService();
    this.http.getNotifcations();
  }
}
