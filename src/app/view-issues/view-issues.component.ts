import { Component } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo';
import { BoatBreakageService } from '../boat-breakage.service'

import { DialogsService } from '../dialog/dialogs.service';

import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.css']
})
export class ViewIssuesComponent{

  constructor(
    private breakageService: BoatBreakageService,
    private dialogsService: DialogsService
  ) {
    this.breakages = breakageService.items;
  }
  breakages: BreakageInfo[];

  cardButtonText = "Fix";

  openDialog(key: any) {
    this.dialogsService
      .confirm('Confirm Mark as Fixed', 'Are you sure you want to do this?', this.cardButtonText)
      .subscribe(result => {
        if (result){
          this.breakageService.markFixed(key);
        }
    });
  }

}
