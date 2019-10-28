import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public authState: boolean;

  constructor(public FIREBASE_AUTH: AuthenticationService) {}

  ngOnInit() {
    this.FIREBASE_AUTH.authState.subscribe(bool => {
      this.authState = bool;
    });
  }

  /* Logout the current user */
  logout() {
    this.FIREBASE_AUTH.logout();
  }

}
