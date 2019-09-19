import { Component, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Redis } from '../../models/redis.model';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent {

  limit: any;
  music: any[];
  imgs: any[];
  vids: any[];
  @Input() title: string;

  constructor(private http: HttpService,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService) { }

  search() {
    this.spinnerService.show();
    this.http.searchAll(this.title, this.limit).subscribe(data => {
      let info = JSON.parse(JSON.stringify(data));
      this.imgs = info.filter((data: any) => {
        return data.type == "image"
      });
      this.vids = info.filter((data: any) => {
        return data.type == "video"
      });
      this.music = info.filter((data: any) => {
        return data.type == "music"
      });

      this.spinnerService.hide();
      if (info.length == 0) {
        this.toastr.warning('لم يتم العثور على ملفات', 'ملفات');
      }
    }, err => {
      console.log(err);
      this.spinnerService.hide();
      this.toastr.error('حصل خطا ما اثناء الاتصال', 'خطأ');
    });
    let redis = new Redis();
    redis.type = "allfiles";
    redis.user = window.navigator.userAgent;
    redis.value = this.title;
    this.http.saveRedis(redis).subscribe(res => {
      console.log(res);
    });
  }
}
