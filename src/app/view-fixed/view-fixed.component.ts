import { Component } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo';
import { BoatBreakageService } from '../boat-breakage.service'
import { DialogsService } from '../dialog/dialogs.service';
@Component({
  selector: 'view-fixed',
  templateUrl: './view-fixed.component.html',
  styleUrls: ['./view-fixed.component.css']
})

export class ViewFixedComponent {
  breakages: BreakageInfo[];
  original: BreakageInfo[];

  constructor(
    private breakageService: BoatBreakageService,
    private dialogsService: DialogsService
  ) {
    this.breakages = breakageService.fixedItems;
    this.original = breakageService.fixedItemsOriginal;
  }
}
