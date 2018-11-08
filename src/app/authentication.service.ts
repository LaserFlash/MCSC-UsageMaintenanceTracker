import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationService {
  public authState: Boolean = false;
  public isAdmin: Boolean = false;
  private user;
  constructor(private afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(data => {
      if (data != null) {
        this.authState = true;
        db.object("userProfile/" + data.uid)
          .valueChanges()
          .subscribe((res) => {
            this.user = res;
            this.isAdmin = this.user.role === "admin";
          });

      }
      this.user = null;
      this.isAdmin = false;
      this.authState = false;
    });
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
