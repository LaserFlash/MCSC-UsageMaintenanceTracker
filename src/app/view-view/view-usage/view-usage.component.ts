import { Component, OnInit } from '@angular/core';

import { BoatUsageService } from '../../boat-usage.service'
import { UsageInfo } from '../../Utils/objects/usageInfo'
import { KnownBoatsService } from '../../known-boats.service';


@Component({
  selector: 'app-view-usage',
  templateUrl: './view-usage.component.html',
  styleUrls: ['./view-usage.component.css']
})
export class ViewUsageComponent implements OnInit {

  boats;
  usages;
  constructor(
    private usageService: BoatUsageService,
    private BOATS: KnownBoatsService
  ) {
    BOATS.boatInformation.subscribe(boats => {
      this.boats = boats;
    });
  }

  ngOnInit() {
    this.usageService.usageData.subscribe(data => {
      this.usages = data;
    });
  }

}
