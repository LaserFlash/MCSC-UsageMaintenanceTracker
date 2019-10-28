import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private AUTH: AuthenticationService, private ROUTER: Router) { }

  ngOnInit() {
    this.AUTH.isAdmin.subscribe(state => {
      if (!state) {
        this.ROUTER.navigateByUrl('/report/usage');
      }
    });
  }

}
