import { Injectable } from '@angular/core';
import { UsageInfo } from './Utils/objects/usageInfo';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { KnownBoatsService } from './known-boats.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class BoatUsageService {
  private itemsCollection: AngularFirestoreCollection<UsageInfo>;
  private sortedByDate: UsageInfo[];

  public lastEachBoat: BehaviorSubject<UsageInfo[]> = new BehaviorSubject([]);
  public lastMonthEachBoat: BehaviorSubject<{ boat: string, duration: number }[]> = new BehaviorSubject([]);
  public usageTimes: BehaviorSubject<{ boat: string, duration: number }[]> = new BehaviorSubject([]);
  public usageData: BehaviorSubject<UsageInfo[]> = new BehaviorSubject([]);

  constructor(db: AngularFirestore, BOATS: KnownBoatsService) {
    this.itemsCollection = db.collection<UsageInfo>('/boatUsage', ref => ref.orderBy('endTime', 'desc').orderBy('boatID'));
    this.itemsCollection.valueChanges().subscribe((data) => {
      // Sort usage for easier manipulation
      this.sortedByDate = data.sort((a, b) => {
        return b.startTime.toDate() - a.startTime.toDate();
      });

      this.usageData.next(this.sortedByDate);

      // Get the last usage for each boat
      const seen = {};
      this.lastEachBoat.next(this.sortedByDate.filter((usage) => {
        if (!seen[usage.boatID]) {
          seen[usage.boatID] = usage;
          return true;
        } else {
          return false;
        }
      }));

      // Total the usage in the last month
      let totals = {};
      const currentDate = new Date();
      const recordsInMonth = this.sortedByDate.filter((usage) => {
        const date = usage.startTime.toDate();
        if (date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
          return true;
        }
        return false;
      });
      recordsInMonth.forEach(usage => {
        if (!totals[usage.boatID]) { totals[usage.boatID] = 0; }
        totals[usage.boatID] += usage.duration;
      });
      const lmeb: { boat: string, duration: number }[] = [];
      Object.keys(totals).forEach(key => {
        lmeb.push({ boat: key, duration: totals[key] });
      });
      this.lastMonthEachBoat.next(lmeb);

      // Total usage all time
      totals = {};
      this.sortedByDate.forEach(usage => {
        if (!totals[usage.boatID]) { totals[usage.boatID] = 0; }
        totals[usage.boatID] += usage.duration;
      });
      const ut: { boat: string, duration: number }[] = [];
      Object.keys(totals).forEach(key => {
        ut.push({ boat: key, duration: totals[key] });
      });
      this.usageTimes.next(ut);
    });
  }

  addUsageInfo(usage: UsageInfo) {
    usage.duration = (usage.endTime - usage.startTime) / (3600000);
    return Promise.resolve(this.itemsCollection.add({ ...usage }));
  }

  private buildDataList(val: UsageInfo[], array: UsageInfo[]) {
    array.length = 0;
    val.forEach(element => {
      array.push(element);
    });
  }

}
