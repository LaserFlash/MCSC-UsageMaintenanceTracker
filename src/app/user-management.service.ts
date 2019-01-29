import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { User } from './Utils/objects/user';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
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

  upgradeToAdmin(key: string) {
    this.DB.object('/userProfile/' + key).update({ role: 'admin' });
  }

  downgradeToUser(key: string) {
    this.DB.object('/userProfile/' + key).update({ role: 'user' });
  }
}
