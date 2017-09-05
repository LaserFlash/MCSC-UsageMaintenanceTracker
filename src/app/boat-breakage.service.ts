import { Injectable } from '@angular/core';
import { BreakageInfo } from './objects/breakageInfo';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Injectable()
export class BoatBreakageService {

  public done: boolean = false;

  public items: BreakageInfo[]=[];
  public original: BreakageInfo[]=[];
  public recentItems: BreakageInfo[]=[];
  public fixedItems: BreakageInfo[]=[];
  public fixedItemsOriginal: BreakageInfo[]=[];

  private itemsData: FirebaseListObservable<BreakageInfo[]>;
  private recentThreeItems: FirebaseListObservable<BreakageInfo[]>;
  private fixedItemsData: FirebaseListObservable<BreakageInfo[]>;

  constructor(private db: AngularFireDatabase) {
    this.itemsData = db.list('/issues');
    this.itemsData.subscribe(val => { this.buildBreakages(val,this.items); });
    this.itemsData.subscribe(val => { this.buildBreakages(val,this.original); });
    this.recentThreeItems = db.list('/issues', {
      query: {
        limitToLast: 3,
        orderByChild: 'timestamp'
      }
    })
    this.recentThreeItems.subscribe(val => { this.buildBreakages(val, this.recentItems); });
    this.fixedItemsData = db.list('/fixed');
    this.fixedItemsData.subscribe(val => { this.buildBreakages(val,this.fixedItems); });
    this.fixedItemsData.subscribe(val => { this.buildBreakages(val,this.fixedItemsOriginal); });
  }

  addBreakageInfo(breakage: BreakageInfo) {
    return Promise.resolve(this.itemsData.push(
      {
        name: breakage.name,
        contact: breakage.contact,
        boatID: breakage.boatID,
        importance: breakage.importance,
        part: breakage.part,
        details: breakage.details,
        timestamp: breakage.timestamp
      }
    ));
  }

  remove(breakage){
    this.itemsData.remove(breakage);
  }

  markFixed(breakage: BreakageInfo){
    this.fixedItemsData.push(
          {
            name: breakage.name,
            contact: breakage.contact,
            boatID: breakage.boatID,
            importance: breakage.importance,
            part: breakage.part == undefined ? null : breakage.part,
            details: breakage.details,
            timestamp: new Date().getTime(),
            timestampReported: breakage.timestamp
          }
        );
    this.remove(breakage);
  }

  private buildBreakages(val: BreakageInfo[], array: BreakageInfo[]) {
        array.length = 0;
        val.forEach(element => {
            array.push(element);
        });
    }
}
