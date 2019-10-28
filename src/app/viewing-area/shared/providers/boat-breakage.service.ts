import { Injectable } from '@angular/core';
import { BreakageInfo } from '../../../core/objects/breakageInfo';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable()
export class BoatBreakageService {

  constructor(private db: AngularFirestore) {

    this.itemsCollectionBroken = db.collection<BreakageInfo>('/boatBreakages', ref => ref.orderBy('timestamp', 'desc'));
    this.itemsCollectionFixed = db.collection<BreakageInfo>('/boatBreakagesFixed', ref => ref.orderBy('timestampFixed', 'desc'));
    /* Download data from firebase */
    this.itemsData = this.itemsCollectionBroken.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as BreakageInfo;
          const id = action.payload.doc.id;
          return { ...data, id };
        });
      })
    );
    this.itemsData.subscribe(val => { this.buildBreakages(val, this.items); });
    this.itemsData.subscribe(val => { this.buildBreakages(val, this.original); });
    this.recentThreeItems = db.collection<BreakageInfo>('/boatBreakages', ref => ref.orderBy('timestamp', 'desc').limit(3)).valueChanges();

    this.recentThreeItems.subscribe(val => { this.buildBreakages(val, this.recentItems); });
    this.fixedItemsData = this.itemsCollectionFixed.valueChanges();
    this.fixedItemsData.subscribe(val => { this.buildBreakages(val, this.fixedItems); });
    this.fixedItemsData.subscribe(val => { this.buildBreakages(val, this.fixedItemsOriginal); });
  }
  private itemsCollectionBroken: AngularFirestoreCollection<BreakageInfo>;
  private itemsCollectionFixed: AngularFirestoreCollection<BreakageInfo>;

  private items: BreakageInfo[] = [];

  private original: BreakageInfo[] = [];

  public recentItems: BreakageInfo[] = [];
  public fixedItems: BreakageInfo[] = [];
  public fixedItemsOriginal: BreakageInfo[] = [];

  private itemsData: Observable<BreakageInfo[]>;
  private recentThreeItems: Observable<BreakageInfo[]>;
  private fixedItemsData: Observable<BreakageInfo[]>;

  public getItems() {
    return this.items;
  }

  public getOriginal() {
    return this.original;
  }

  /** Move a current breakage from an issue to fixed */
  public markFixed(breakage: BreakageInfo) {
    this.itemsCollectionFixed.add(
      {
        name: breakage.name,
        contact: breakage.contact,
        boatID: breakage.boatID,
        importance: breakage.importance,
        part: breakage.part === undefined ? null : breakage.part,
        details: breakage.details,
        timestampFixed: new Date(),
        timestamp: breakage.timestamp,
        id: null,
        imageID: breakage.imageID === undefined ? null : breakage.imageID
      }
    );
    this.remove(breakage);
  }

  private remove(breakage) {
    this.itemsCollectionBroken.doc(breakage.id).delete();
  }

  private buildBreakages(val: BreakageInfo[], array: BreakageInfo[]) {
    array.length = 0;
    val.forEach(element => {
      array.push(element);
    });
  }
}
