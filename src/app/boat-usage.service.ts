import { Injectable } from '@angular/core';
import { UsageInfo } from './Utils/objects/usageInfo';
import { Boats } from './Utils/menuNames';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class BoatUsageService {
  private itemsCollection: AngularFirestoreCollection<UsageInfo>;
  public items: Observable<UsageInfo[]>;

  private sortedUsage: Observable<UsageInfo[]>;

  public lastUsageEachBoat: UsageInfo[] = [];

  public usageData: UsageInfo[] = [];
  public usageTimes: number[] = [0, 0, 0, 0, 0];

  public lastMonthUsageEachBoat: number[] = [0, 0, 0, 0, 0];

  constructor(db: AngularFirestore) {
    this.itemsCollection = db.collection<UsageInfo>('/boatUsage', ref => ref.orderBy('endTime', 'desc').orderBy('boatID'));
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
    /* Build or rearrange the UsageInfo into a list where each boat is in index order and added together*/
    this.items.subscribe((list: UsageInfo[]) => {
      this.usageTimes.splice(0, this.usageTimes.length, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      list.forEach((val: UsageInfo) => {
        const original = this.usageTimes[Boats.indexOf(val.boatID)];
        this.usageTimes.splice(Boats.indexOf(val.boatID), 1, original + val.duration);
      }
      );
});

    this.items.subscribe((list: UsageInfo[]) => {
      this.lastMonthUsageEachBoat.splice(0, this.lastMonthUsageEachBoat.length, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      list.forEach((val: UsageInfo) => {
        const lastDate = new Date();
        lastDate.setMonth(lastDate.getMonth() - 1);
        if (this.makeDate(val.endTime) > lastDate) {
          const original = this.lastMonthUsageEachBoat[Boats.indexOf(val.boatID)];
          this.lastMonthUsageEachBoat.splice(Boats.indexOf(val.boatID), 1, original + val.duration);
        }
      }
      );
    });
  }

  addUsageInfo(usage: UsageInfo) {
    return Promise.resolve(this.itemsCollection.add(Object.assign({}, usage)));
  }

  private buildDataList(val: UsageInfo[], array: UsageInfo[]) {
    array.length = 0;
    val.forEach(element => {
      array.push(element);
    });
  }

  private makeDate(date: any) {
    try {
      return date.toDate();
    } catch (error) {
      return date;
    }
  }

}
