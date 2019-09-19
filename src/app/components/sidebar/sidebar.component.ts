import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'قائمة البحث', icon: 'search', class: '' },
  { path: '/all-notify', title: 'قائمة الاشعارات', icon: 'notification_important', class: '' },
  { path: '/settings', title: 'الاعدادات', icon: 'settings_applications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isAdmin = false;
  menuItems: any[];

  constructor(private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

  logout() {
    this.isAdmin = false;
    this.storage.set(STORAGE_KEY, null);
    this.router.navigate(['login']);
  }

  ngOnInit() {
    if (this.storage.get(STORAGE_KEY) != null) {
      this.isAdmin = true;
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
