import { Injectable } from '@angular/core';
import { UsageInfo } from '../../../../core/objects/usageInfo';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { KnownBoatsService } from '../../../../core/constants/known-boats/known-boats.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';


@Injectable()
export class BoatUsageService {

  public infiniteUsages: Observable<any[]>;
  private offset = new BehaviorSubject(new Date());

  batch_size = 10;
  theEnd = false;

  constructor(private db: AngularFirestore, BOATS: KnownBoatsService) {

    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n, this.batch_size)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {})
    );

    this.infiniteUsages = batchMap.pipe(map(v => Object.values(v)));

  }

  /* Get a set of usage data from DB */
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
}
