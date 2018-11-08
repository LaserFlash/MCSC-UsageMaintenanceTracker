import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {
  public authState: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private user;
  constructor(private afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(data => {
      this.user = null;
      this.isAdmin.next(false);
      this.authState.next(false);
      if (data != null) {
        this.authState.next(true);
        db.object("userProfile/" + data.uid)
          .valueChanges()
          .subscribe((res) => {
            this.user = res;
            this.isAdmin.next(this.user.role === "admin");
          });
      }
    });
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
