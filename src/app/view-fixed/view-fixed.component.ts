import { Component } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo';
import { BoatBreakageService } from '../boat-breakage.service'

import { DialogsService } from '../dialog/dialogs.service';

import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'view-fixed',
  templateUrl: './view-fixed.component.html',
  styleUrls: ['./view-fixed.component.css']
})
export class ViewFixedComponent{

  constructor(
    private breakageService: BoatBreakageService,
    private dialogsService: DialogsService
  ) {
    this.breakages = breakageService.fixedItems;
  }
  breakages: BreakageInfo[];

}
