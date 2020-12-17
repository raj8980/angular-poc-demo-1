import  firebase  from 'firebase/app';

import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser:AppUser;
  isAdmin:boolean;
  constructor(private auth:AuthService) {
      auth.appUser$.subscribe(appUser=>this.appUser=appUser);
      auth.appUser$.subscribe(appUser=>this.isAdmin=appUser.isAdmin);
   }

  logout() {
   this.auth.logout();
  }
}
