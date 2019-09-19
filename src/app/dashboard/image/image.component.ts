import { Component, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Redis } from '../../models/redis.model';
import { Colors } from '../../models/colors';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  constructor(private http: HttpService,
    public colors: Colors,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService) { }

  media: any[];
  orientation: any = "any";
  selectedColor = '';
  color: any = "any";
  @Input() title: string;

  onChange(value: any) {
    if (value == 'any') {
      this.selectedColor = "#ffffff";
    }
    else
      this.selectedColor = value;
  }

  search() {
    this.spinnerService.show();
    this.http.searchImage(this.title, this.orientation, this.color).subscribe(data => {
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
    redis.type = "images";
    redis.user = window.navigator.userAgent;
    redis.value = this.title;
    this.http.saveRedis(redis).subscribe(res => {
      console.log(res);
    });
  }
}
