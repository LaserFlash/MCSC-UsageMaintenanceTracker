import { Component, OnInit } from '@angular/core';
import { BreakageInfo } from '../../Utils/objects/breakageInfo';
import { BoatBreakageService } from '../../boat-breakage.service'
import { DialogsService } from '../../shared/dialog/dialogs.service';
@Component({
  selector: 'view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.css']
})
export class ViewIssuesComponent implements OnInit {
  breakages: BreakageInfo[];
  original: BreakageInfo[];

  cardButtonText = 'Fix';

  ngOnInit() {
    this.breakages = this.breakageService.getItems();
    this.original = this.breakageService.getOriginal();
  }

  constructor(
    private breakageService: BoatBreakageService,
    private dialogsService: DialogsService
  ) {}

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
