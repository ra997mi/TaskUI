import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Login } from '../models/login.model';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { EncryptService } from '../services/encrypt.service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: any;
  password: any;
  show: boolean = false;

  ckPassword() {
    this.show = !this.show;
  }

  constructor(private httpService: HttpService,
    public login: Login,
    private toastr: ToastrService,
    private router: Router,
    private enc: EncryptService,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

  signIn() {
    this.login.Username = this.username;
    this.login.Password = this.enc.encryptPassword('24', this.password);
    this.httpService.login(this.login).subscribe(res => {
      console.log(res);
      if (res == 'Success') {
        this.storage.set(STORAGE_KEY, res);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.toastr.warning('يرجى التاكد من معلومات الدخول', 'معلومات الدخول');
      }
    }, error => {
      console.log(error);
      this.toastr.error('حدث خطا اثناء الاتصال', 'خطأ');
    });
  }
}
