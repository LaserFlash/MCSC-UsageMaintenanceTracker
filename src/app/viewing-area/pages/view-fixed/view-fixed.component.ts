import { Component, OnInit } from '@angular/core';
import { BreakageInfo } from '../../../core/objects/breakageInfo';
import { BoatBreakageService } from '../../shared/providers/boat-breakage.service';

@Component({
  selector: 'view-fixed',
  templateUrl: './view-fixed.component.html',
  styleUrls: ['./view-fixed.component.css']
})

export class ViewFixedComponent implements OnInit {
  breakages: BreakageInfo[];
  original: BreakageInfo[];

  constructor(
    private breakageService: BoatBreakageService
  ) { }

  ngOnInit() {
    this.breakages = this.breakageService.fixedItems;
    this.original = this.breakageService.fixedItemsOriginal;
  }
}
