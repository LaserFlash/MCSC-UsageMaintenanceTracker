import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { User } from '../../../core/objects/user';
import { AuthenticationService } from '../../../core/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})

/**
* UserManagementService - provides functionality to change the role of a user
*   - Upgrade to admin
*   - Downgrade to user
*   - Retrieve users
*
*/
export class UserManagementService {

  public users: BehaviorSubject<User[]> = new BehaviorSubject([]);

  constructor(private DB: AngularFireDatabase, private AUTH: AuthenticationService) {
    let usersRaw: any;
    AUTH.authState.subscribe(() => {
      usersRaw = DB.list('/userProfile/')
        .snapshotChanges().pipe(map(items => {
          return items.map(a => {
            const data = a.payload.val();
            const id = a.payload.key;
            return { id, ...data };
          });
        }));
    });
    usersRaw.subscribe(data => {
      this.users.next(data);
    });
  }

  /* Elevate the given user (by key) */
  upgradeToAdmin(key: string) {
    this.DB.object('/userProfile/' + key).update({ role: 'admin' });
  }

  /* Downgrade the given user (by key) */
  downgradeToUser(key: string) {
    this.DB.object('/userProfile/' + key).update({ role: 'user' });
  }
}
