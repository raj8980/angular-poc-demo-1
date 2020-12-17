import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    public auth: AuthService// Inject Firebase auth service
  ) { }

  // Sign in with Google
  login() {
    this.auth.login();
  }
  logout(){
    
  }
}
