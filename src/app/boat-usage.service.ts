import { Injectable } from '@angular/core';
import { UsageInfo } from './objects/usageInfo';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Injectable()
export class BoatUsageService {
  items: FirebaseListObservable<any>;

  constructor(db: AngularFireDatabase) {
    this.items = db.list('/usage');
  }

  addUsageInfo(usage: UsageInfo){
    return Promise.resolve(this.items.push({boatID:usage.id,duration:usage.duration,date:usage.date.getTime()}));
  }
}
