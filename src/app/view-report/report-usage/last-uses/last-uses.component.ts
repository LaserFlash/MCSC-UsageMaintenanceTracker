import { Component, OnInit, Input } from '@angular/core';

import { BoatUsageService } from '../../../boat-usage.service';
import { KnownBoatsService } from '../../../known-boats.service';
import { UsageInfo } from '../../../Utils/objects/usageInfo';

@Component({
  selector: 'last-uses',
  templateUrl: './last-uses.component.html',
  styleUrls: ['./last-uses.component.css']
})
export class LastUsesComponent implements OnInit {

  usage: UsageInfo[];

  constructor(private boatUsageService: BoatUsageService, private BOATS: KnownBoatsService) {
    boatUsageService.lastEachBoat.subscribe(usages => {
      this.usage = usages;
    });
  }

  ngOnInit() { }

  private getBoatName(v) {
    return this.BOATS.getBoatName(v);
  }
}
