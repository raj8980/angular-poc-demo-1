import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

import firebase from 'firebase/app';
import { Observable,of } from 'rxjs';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import {map,switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User>;
  constructor(private userService:UserService,private afAuth:AngularFireAuth,private route:ActivatedRoute) {
    this.user$=afAuth.authState;
   }

  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);

    let provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    this.afAuth.signInWithRedirect(provider)
      .catch((error) => {
        console.log('error:', error);
      });
  }
  logout(){
    this.afAuth.signOut();
  }

  get appUser$():Observable<AppUser>{
    return this.user$.pipe(switchMap(user=>{
      if(user) return this.userService.get(user.uid).pipe(map((appUser:AppUser)=>appUser));
      
      return of(null);
    }));
  }
}
