import { Injectable } from '@angular/core';
import { BreakageInfo } from '../../../core/objects/breakageInfo';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BoatBreakageService {

  public recentItems: BreakageInfo[] = [];
  private recentThreeItems: Observable<BreakageInfo[]>;

  private itemsCollectionBroken: AngularFirestoreCollection<BreakageInfo>;

  constructor(private db: AngularFirestore) {

    this.recentThreeItems = db.collection<BreakageInfo>('/boatBreakages', ref => ref.orderBy('timestamp', 'desc').limit(3)).valueChanges();
    this.recentThreeItems.subscribe(val => { this.buildBreakages(val, this.recentItems); });

    this.itemsCollectionBroken = db.collection<BreakageInfo>('/boatBreakages', ref => ref.orderBy('timestamp', 'desc'));
  }

  /** Push breakage to firebase */
  public addBreakageInfo(breakage: BreakageInfo) {
    return Promise.resolve(this.itemsCollectionBroken.add(
      {
        name: breakage.name,
        contact: breakage.contact,
        boatID: breakage.boatID,
        importance: breakage.importance,
        part: breakage.part,
        details: breakage.details,
        timestampFixed: null,
        timestamp: breakage.timestamp,
        id: null,
        imageID: breakage.imageID === undefined ? null : breakage.imageID
      }
    ));
  }



  private buildBreakages(val: BreakageInfo[], array: BreakageInfo[]) {
    array.length = 0;
    val.forEach(element => {
      array.push(element);
    });
  }
}
