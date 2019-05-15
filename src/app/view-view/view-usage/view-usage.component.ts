import { Component, OnInit, ViewChild } from '@angular/core';

import { BoatUsageService } from '../../boat-usage.service'
import { UsageInfo } from '../../Utils/objects/usageInfo'
import { KnownBoatsService } from '../../known-boats.service';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-view-usage',
  templateUrl: './view-usage.component.html',
  styleUrls: ['./view-usage.component.css']
})
export class ViewUsageComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  boats;
  infiniteUsages;
  constructor(
    public usageService: BoatUsageService,
    private BOATS: KnownBoatsService
  ) {
    BOATS.boatInformation.subscribe(boats => {
      this.boats = boats;
    });
  }

  ngOnInit() { }


  geNextBatch(e, offset) {
    offset = offset == undefined ? new Date() : offset.endTime;
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    this.usageService.nextBatch(e, offset, end, total);
  }


  trackByIdx(i) {
    return i;
  }

  getItemHeight(){
    if (window.innerWidth <= 599) {
      return 130;
    }
    return 80;
  }
}
