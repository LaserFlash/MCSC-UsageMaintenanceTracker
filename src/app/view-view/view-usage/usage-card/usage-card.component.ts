import { Component, OnInit, Input } from '@angular/core';
import { UsageInfo } from '../../../Utils/objects/usageInfo';
import { BoatNameConversionHelper, WindSpeedConversionHelper, WindDirectionConversionHelper, WaterStateConversionHelper } from '../../../Utils/nameConversion';
@Component({
  selector: 'usage-card',
  templateUrl: './usage-card.component.html',
  styleUrls: ['./usage-card.component.css']
})
export class UsageCardComponent implements OnInit {

  @Input() usages: UsageInfo[];

  constructor() { }

  ngOnInit() {
  }

  private getBoatName(v) {
    return BoatNameConversionHelper.boatNameFromNumber(v);
  }

  private getWindSpeed(v) {
    return WindSpeedConversionHelper.windSpeedFromNumber(v);
  }

  private getWindDirection(v) {
    return WindDirectionConversionHelper.windDirectionFromNumber(v);
  }

  private getSeaState(v) {
    return WaterStateConversionHelper.waterStateFromNumber(v);
  }

  private shortDuration(duration) {
    return Number.parseFloat(duration).toPrecision(2).toString();
  }


}
