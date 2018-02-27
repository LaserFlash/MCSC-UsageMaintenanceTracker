import { Component, OnInit, Input } from '@angular/core';

import { BoatUsageService } from '../../../boat-usage.service'
import { UsageInfo } from '../../../Utils/objects/usageInfo'

import { BoatNameConversionHelper } from '../../../Utils/nameConversion'

@Component({
  selector: 'last-uses',
  templateUrl: './last-uses.component.html',
  styleUrls: ['./last-uses.component.css']
})
export class LastUsesComponent implements OnInit {

  usage: UsageInfo[];

  constructor(private boatUsageService: BoatUsageService) {
    this.usage = boatUsageService.lastUsageEachBoat;
  }

  ngOnInit() {}

  private getBoatName(v) {
    return BoatNameConversionHelper.boatNameFromNumber(v);
  }
}
