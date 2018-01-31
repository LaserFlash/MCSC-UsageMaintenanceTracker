import { Component } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo';
import { BoatBreakageService } from '../boat-breakage.service'
import { DialogsService } from '../dialog/dialogs.service';
@Component({
  selector: 'view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.css']
})
export class ViewIssuesComponent {
  breakages: BreakageInfo[];
  original: BreakageInfo[];

  cardButtonText = 'Fix';

  constructor(
    private breakageService: BoatBreakageService,
    private dialogsService: DialogsService
  ) {
    this.breakages = breakageService.items;
    this.original = breakageService.original;
  }

  public openDialog(key: any) {
    this.dialogsService
      .confirm('Confirm Mark as Fixed', 'Are you sure you want to do this?', this.cardButtonText)
      .subscribe(result => {
        if (result) {
          this.breakageService.markFixed(key);
        }
    });
  }

}
