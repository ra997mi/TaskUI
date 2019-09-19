import { Component, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import { HttpService } from '../../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Redis } from '../../models/redis.model';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent {

  media: any[];
  minValue: number = 0;
  maxValue: number = 3600;
  @Input() title: string;

  options: Options = {
    floor: 0,
    ceil: 3600,
    step: 60,
    translate: (value: number): string => {
      if (value >= 3600)
        return 'any';
      else
        return (value / 60) + 'Min';
    }
  };

  constructor(private http: HttpService,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService) { }

  search() {
    this.spinnerService.show();
    this.http.searchMusic(this.title, this.minValue, this.maxValue).subscribe(data => {
      this.media = JSON.parse(JSON.stringify(data));
      this.spinnerService.hide();
      if (this.media.length == 0) {
        this.toastr.warning('لم يتم العثور على ملفات', 'ملفات');
      }
    }, err => {
      console.log(err);
      this.spinnerService.hide();
      this.toastr.error('حصل خطا ما اثناء الاتصال', 'خطأ');
    });
    let redis = new Redis();
    redis.type = "music";
    redis.user = window.navigator.userAgent;
    redis.value = this.title;
    this.http.saveRedis(redis).subscribe(res => {
      console.log(res);
    });
  }
}
