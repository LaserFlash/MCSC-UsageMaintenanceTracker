import { Component, OnInit, ViewChild } from '@angular/core';

import { UsageInfo } from '../../../core/objects/usageInfo';
import { BoatUsageService } from './providers/boat-usage.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-view-usage',
  templateUrl: './view-usage.component.html',
  styleUrls: ['./view-usage.component.css']
})
export class ViewUsageComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport: CdkVirtualScrollViewport;

  infiniteUsages;
  constructor(
    public usageService: BoatUsageService,
  ) { }

  ngOnInit() {}


  getNextBatch(e, offset) {
    /* If Viewport not their don't get batch */
    if (!this.viewport){
      return;
    }
    offset = !offset ? new Date() : offset.endTime;
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    return this.usageService.nextBatch(e, offset, end, total);
  }


  trackByIdx(i) {
    return i;
  }

  getItemHeight() {
    if (window.innerWidth <= 599) {
      return 130;
    }
    return 80;
  }
}
