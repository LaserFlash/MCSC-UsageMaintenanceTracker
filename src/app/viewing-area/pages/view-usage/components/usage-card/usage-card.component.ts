import { Component, OnInit, Input } from '@angular/core';
import { UsageInfo } from '../../../../../core/objects/usageInfo';
import { WindSpeedConversionHelper, WindDirectionConversionHelper, WaterStateConversionHelper } from '../../../../../core/constants/menu-names/nameConversion';
import { KnownBoatsService } from '../../../../../core/constants/known-boats/known-boats.service';
@Component({
  selector: 'usage-card',
  templateUrl: './usage-card.component.html',
  styleUrls: ['./usage-card.component.css']
})
export class UsageCardComponent implements OnInit {

  @Input() usage: UsageInfo;

  constructor(private BOATS: KnownBoatsService) { }

  ngOnInit() { }

  getBoatName(v) {
    return this.BOATS.getBoatName(v);
  }

  getWindSpeed(v) {
    return WindSpeedConversionHelper.windSpeedFromNumber(v);
  }

  getWindDirection(v) {
    return WindDirectionConversionHelper.windDirectionFromNumber(v);
  }

  getSeaState(v) {
    return WaterStateConversionHelper.waterStateFromNumber(v);
  }

  shortDuration(duration) {
    return Number.parseFloat(duration).toPrecision(2).toString();
  }


}
