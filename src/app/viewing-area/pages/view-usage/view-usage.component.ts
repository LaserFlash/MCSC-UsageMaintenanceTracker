import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { UsageInfo } from '../../../core/objects/usageInfo';
import { BoatUsageService } from './providers/boat-usage.service';


@Component({
  selector: 'app-view-usage',
  templateUrl: './view-usage.component.html',
  styleUrls: ['./view-usage.component.css']
})
export class ViewUsageComponent implements OnInit {

  // MatPaginator Output
  pageEvent: PageEvent;
  totalNumberItems = 0;
  pageSizeOptions = [5, 10, 20, 40, 50, 100];
  usages;

  constructor(
    public usageService: BoatUsageService,
  ) { }

  ngOnInit() {
    this.usageService.totalNumberOfUsages.subscribe(val => {
      this.totalNumberItems = val;
    });
    this.usageService.currentSelectedUsages.subscribe(val => { this.usages = val })
  }


  getUsages(event?: PageEvent) {
    let offset = -1;
    if (event.pageSize != this.usageService.batch_size) {
      return this.usageService.updateBatch(event.pageSize);
    }
    if (event.pageIndex > event.previousPageIndex) {
      return this.usageService.forwardBatch(event.pageSize - 1)
      offset = event.pageSize - 1;
    } else if (event.pageIndex < event.previousPageIndex) {
      return this.usageService.backBatch(event.pageSize - 1)
    }
  }


  trackByIdx(i) {
    return i;
  }
}
