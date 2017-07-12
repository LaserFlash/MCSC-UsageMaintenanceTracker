import { Injectable } from '@angular/core';
import { BreakageInfo } from './objects/breakageInfo';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Injectable()
export class BoatBreakageService {

  items: FirebaseListObservable<BreakageInfo[]>;
  recentThreeItems: FirebaseListObservable<BreakageInfo[]>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/issues');
    this.recentThreeItems = db.list('/issues', {
      query: {
        limitToLast: 3,        
      }
    });
  }

  addBreakageInfo(breakage: BreakageInfo) {
    return Promise.resolve(this.items.push(
      {
        name: breakage.name,
        contact: breakage.contact,
        boatID: breakage.boatID,
        importance: breakage.importance,
        details: breakage.details,
        timestamp: breakage.timestamp.getTime()
      }
    ));
  }

  getBreakageInfo(): FirebaseListObservable<BreakageInfo[]> {
    return this.items;
  }
  getLastThreeBreakageInfo(): FirebaseListObservable<BreakageInfo[]> {
    return this.recentThreeItems;
  }
}
