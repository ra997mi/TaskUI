import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notify } from '../models/notify.model';
import { Login } from '../models/login.model';
import { Redis } from '../models/redis.model';
import { ToastrService } from 'ngx-toastr';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public SERVER: string = "http://10.4.13.48/";
  public connection: signalR.HubConnection;

  constructor(private httpClient: HttpClient, @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService) {
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(this.SERVER + `notifies`)
      .build();
  }

  login(login: Login) {
    return this.httpClient.post(this.SERVER + "api/logins", login, { responseType: 'text' });
  }

  getAllUserNotify() {
    return this.httpClient.get(this.SERVER + "api/notifies");
  }

  postNotify(notify: Notify) {
    return this.httpClient.post(this.SERVER + "api/notifies", notify, { responseType: 'text' });
  }

  deleteNotify(id) {
    return this.httpClient.delete(this.SERVER + "api/notifies" + "/" + id, { responseType: 'text' });
  }

  searchAll(title?: string, limit?: number) {
    var query = "";
    if (title == null || title == "" || title == undefined) {
      title = "any";
    }
	query = query + title;
	if (limit != null && limit != undefined) {
        query = query + '/' + limit;
	}	
    return this.httpClient.get(this.SERVER + `api/media/all/${query}`);
  }

  searchMusic(title?: string, min?: number, max?: number) {
    var query = "";
    if (title == null || title == "") {
      title = "any";
    }
    query = query + title;
    if (min != null) {
      query = query + '/' + min;
      if (max != null) {
        query = query + '/' + max;
      }
    }
    return this.httpClient.get(this.SERVER + `api/media/music/${query}`);
  }

  searchVideo(title?: string, min?: number, max?: number) {
    var query = "";
    if (title == null || title == "") {
      title = "any";
    }
    query = query + title;
    if (min != null) {
      query = query + '/' + min;
      if (max != null) {
        query = query + '/' + max;
      }
    }
    return this.httpClient.get(this.SERVER + `api/media/video/${query}`);
  }

  searchImage(title?: string, orientation?: string, color?: string) {
    var query = "";
    if (title == null || title == "") {
      title = "any";
    }
    query = query + title;
    if (orientation != null && orientation != "") {
      query = query + '/' + orientation;
      if (color != null && color != "") {
        query = query + '/' + color;
      }
    }
    return this.httpClient.get(this.SERVER + `api/media/image/${query}`);
  }

  saveRedis(redis: Redis) {
    return this.httpClient.post(this.SERVER + `api/data/WEB/`, redis, { responseType: 'text' });
  }

  startSignalService() {
    this.connection.start().then(function () {
      console.log('Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });
  }

  stopSignalService() {
    this.connection.stop().then(function () {
      console.log('Disconnected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });
  }

  getNotifcations() {
    this.connection.on("BroadcastMessage", (title: string, content: string) => {
      if (this.storage.get('notifySettings') != null && this.storage.get('notifySettings') == true) {
        this.toastr.show(content, title);
      }
    });
  }
}
