import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {
  public authState: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.afAuth.authState.subscribe((data) => {
      if (!data) {
        this.isAdmin.next(false);
        this.authState.next(false);
      }

      if (data != null) {
        data = this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult) => {
          // Confirm the user is an Admin.
          if (!!idTokenResult.claims.admin) {
            this.isAdmin.next(true);
          } else {
            this.isAdmin.next(false);
          }
          this.authState.next(true);
        });
      }
    });
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
