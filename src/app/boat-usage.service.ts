import { Injectable } from '@angular/core';
import { UsageInfo } from './objects/usageInfo';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Injectable()
export class BoatUsageService {
  public items: FirebaseListObservable<UsageInfo[]>;

  public usageData:UsageInfo[] = [];
  public usageTimes:number[] = [0,0,0,0,0,0,0,0];

  constructor(db: AngularFireDatabase) {
    this.items = db.list('/usage');
    this.items.subscribe(val => { this.buildDataList(val,this.usageData); });

    this.items.subscribe((list:UsageInfo[]) => {
      this.usageTimes.splice(0,this.usageTimes.length,0,0,0,0,0,0,0,0);
      list.forEach((val:UsageInfo) => {
        let original = this.usageTimes[parseInt(val.boatID.replace("New ","0")) - 1];
        this.usageTimes.splice(parseInt(val.boatID.replace("New ","0")) - 1, 1,  original + val.duration);
      }
      )});
  }

  addUsageInfo(usage: UsageInfo){
    return Promise.resolve(this.items.push({boatID:usage.boatID,duration:usage.duration,date:usage.date.getTime()}));
  }

  private buildDataList(val: UsageInfo[], array: UsageInfo[]){
    array.length = 0;
    val.forEach(element => {
        array.push(element);
    });
  }

}
