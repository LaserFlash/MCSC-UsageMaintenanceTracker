import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';

import { UsageInfo } from '../../../core/objects/usageInfo';
import { KnownBoatsService } from '../../../core/constants/known-boats/known-boats.service';


@Injectable()
export class BoatUsageService {

  public infiniteUsages: Observable<any[]>;
  private offset = new BehaviorSubject( new Date());

  batch_size = 10;
  theEnd = false;

  private itemsCollection: AngularFirestoreCollection<UsageInfo>;
  private sortedByDate: UsageInfo[];

  public lastEachBoat: BehaviorSubject<UsageInfo[]> = new BehaviorSubject([]);
  public lastMonthEachBoat: BehaviorSubject<{ boat: string, duration: number }[]> = new BehaviorSubject([]);
  public usageTimes: BehaviorSubject<{ boat: string, duration: number }[]> = new BehaviorSubject([]);
  public usageData: BehaviorSubject<UsageInfo[]> = new BehaviorSubject([]);

  constructor(private db: AngularFirestore, BOATS: KnownBoatsService) {
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

    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n, this.batch_size)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {})
    );

    this.infiniteUsages = batchMap.pipe(map(v => Object.values(v)));

  }

  getBatch(offset, batch_size) {
    return this.db
      .collection<UsageInfo>('/boatUsage', ref => ref.orderBy('endTime', 'desc').startAfter(offset).limit(batch_size))
      .snapshotChanges()
      .pipe(
        tap(arr => (arr.length ? null : (this.theEnd = true))),
        map(arr => {
          return arr.reduce((acc, cur) => {
            const id = cur.payload.doc.id;
            const data = cur.payload.doc.data();
            return { ...acc, [id]: data };
          }, {});
        })
      );
  }

  nextBatch(e, offset, end, total) {
    if (this.theEnd) {
      return;
    }

    if (end === total) {
      this.offset.next(offset);
    }
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
