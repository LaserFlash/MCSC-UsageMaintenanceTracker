import { Component, OnInit, Input } from '@angular/core';

import { BoatUsageService } from '../boat-usage.service'
import { UsageInfo } from '../objects/usageInfo'

@Component({
  selector: 'last-uses',
  templateUrl: './last-uses.component.html',
  styleUrls: ['./last-uses.component.css']
})
export class LastUsesComponent implements OnInit {

  private usage: UsageInfo[];

  constructor(private boatUsageService: BoatUsageService) {
    this.usage = boatUsageService.usageData;
  }

  ngOnInit() {}

}
