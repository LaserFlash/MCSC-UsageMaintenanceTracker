import { Component, OnInit, Input } from '@angular/core';

import { BoatUsageService } from '../../../../shared/providers/boat-usage.service';
import { KnownBoatsService } from '../../../../../core/constants/known-boats/known-boats.service';
import { UsageInfo } from '../../../../../core/objects/usageInfo';

@Component({
  selector: 'last-uses',
  templateUrl: './last-uses.component.html',
  styleUrls: ['./last-uses.component.css']
})
export class LastUsesComponent implements OnInit {

  usage: UsageInfo[];

  constructor(
    private boatUsageService: BoatUsageService,
    private BOATS: KnownBoatsService
  ) { }

  ngOnInit() {
    this.boatUsageService.lastEachBoat.subscribe(usages => {
      this.usage = usages;
    });
  }

  private getBoatName(v) {
    return this.BOATS.getBoatName(v);
  }
}
