import { Injectable } from '@angular/core';
import { UsageInfo } from './objects/usageInfo';
import { Boats } from './Utils/menuNames'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class BoatUsageService {
  private itemsCollection: AngularFirestoreCollection<UsageInfo>
  public items: Observable<UsageInfo[]>;

  private sortedUsage: Observable<UsageInfo[]>;
  public lastUsageEachBoat: UsageInfo[] = [];

  public usageData: UsageInfo[] = [];
  public usageTimes: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

  constructor(db: AngularFirestore) {
    this.itemsCollection = db.collection<UsageInfo>('/boatUsage', ref => ref.orderBy('date', 'desc').orderBy('boatID'));
    this.items = this.itemsCollection.valueChanges();
    this.items.subscribe(val => { this.buildDataList(val, this.usageData); });

    this.sortedUsage = this.itemsCollection.valueChanges();

    this.sortedUsage.subscribe(val => {
      const tmp: number[] = [];
      this.lastUsageEachBoat.length = 0;
      val.forEach(element => {
        if (tmp.indexOf(element.boatID) < 0) {
          tmp.push(element.boatID);
          this.lastUsageEachBoat.push(element);
        }
      });
    });

    // TODO Do this better
    /*Build or rearrange the UsageInfo into a list where each boats is in index order and added together*/
    this.items.subscribe((list: UsageInfo[]) => {
      this.usageTimes.splice(0, this.usageTimes.length, 0, 0, 0, 0, 0);
      list.forEach((val: UsageInfo) => {
        const original = this.usageTimes[Boats.indexOf(val.boatID)];
        this.usageTimes.splice(Boats.indexOf(val.boatID), 1,  original + val.duration);
      }
      )});
  }

  addUsageInfo(usage: UsageInfo) {
    return Promise.resolve(this.itemsCollection.add({boatID: usage.boatID, duration: usage.duration, date: usage.date}));
  }

  private buildDataList(val: UsageInfo[], array: UsageInfo[]) {
    array.length = 0;
    val.forEach(element => {
        array.push(element);
    });
  }

}
