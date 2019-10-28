import { Component, OnInit } from '@angular/core';
import { BreakageInfo } from '../../../core/objects/breakageInfo';
import { BoatBreakageService } from '../../shared/providers/boat-breakage.service';

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
  ) { }

  public remove(key: any) {
    this.breakageService.markFixed(key);
  }

}
