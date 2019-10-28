import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {

  public authState: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.afAuth.authState.subscribe((data) => {
      console.log(data);
      if (!data) {
        this.isAdmin.next(false);
        this.authState.next(false);
      }

      if (data != null) {
        this.afAuth.auth.currentUser.getIdTokenResult().then((idTokenResult) => {
          this.authState.next(true); // Is now authenticated

          // Confirm the user is an Admin.
          if (!!idTokenResult.claims.admin) {
            this.isAdmin.next(true);
            return;
          }

          this.isAdmin.next(false); // If reached not an admin

        }).catch(() => {
          this.isAdmin.next(false);
        });
      }
    });
  }

  /* Logout the current user */
  public logout() {
    this.afAuth.auth.signOut();
  }
}
