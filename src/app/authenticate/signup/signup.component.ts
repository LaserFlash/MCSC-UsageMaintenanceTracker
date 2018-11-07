import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public FIREBASE_AUTH: AuthenticationService) { }

  ngOnInit() {
  }

  logout(){
      console.log("Logging Out");
      this.FIREBASE_AUTH.logout();
  }

}
