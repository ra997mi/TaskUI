import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatDialog } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-all-notify',
  templateUrl: './all-notify.component.html',
  styleUrls: ['./all-notify.component.scss']
})
export class AllNotifyComponent implements OnInit {

  isAdmin = false;
  notifies: [];
  msg = "لا يوجد عناصر";

  constructor(private httpService: HttpService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getNotifcationsData();
    if (this.storage.get(STORAGE_KEY) != null) {
      this.isAdmin = true;
    }
    this.httpService.getAllUserNotify().subscribe(res => {
      let info = JSON.parse(JSON.stringify(res));
      if (info.length == 0 || info == null || info == undefined) {
        $('#no-items-ava').show();
        $('#SHOW').hide();
      }
      else {
        $('#no-items-ava').hide();
        $('#SHOW').show();
        this.notifies = info;
      }
    }, err => {
      this.msg = "خطا اثناء الاتصال";
      $('#no-items-ava').show();
      $('#SHOW').hide();
      console.log(err);
    });
  }

  openDialog(Id: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.httpService.deleteNotify(Id).subscribe((res: any) => {
          if (res == "Success")
            this.toastr.success('تم حذف الحدث بنجاح', 'تم الحذف');
        }, err => {
          this.toastr.error('حصل خطا ما اثناء الحذف', 'خطأ');
          console.error(err);
        });
      }
    });
  }

  getNotifcationsData() {
    this.httpService.connection.on("NotifiesData", (data: any) => {
      this.notifies = JSON.parse(JSON.stringify(data));
    });
  }
}

