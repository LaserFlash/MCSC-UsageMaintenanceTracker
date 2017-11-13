import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo'
import { UserFriendlyBoats } from '../Utils/menuNames'
import { BoatNameConversionHelper, ImportanceConversionHelper } from '../Utils/nameConversion'

import { ThemeTrackerService } from '../theme-tracker.service'

@Component({
  selector: 'breakage-card',
  templateUrl: './breakage-card.component.html',
  styleUrls: ['./breakage-card.component.css']
})
export class BreakageCardComponent {
  constructor(private themeTracker: ThemeTrackerService ) {
    this.isDarkTheme = themeTracker.isDark;
  }

  isDarkTheme:boolean;

  @Input() buttonText: string;
  @Input() breakages: BreakageInfo[];
  @Output() onRemove = new EventEmitter<boolean>();

  /**Generate string to represent timestamp dd/mm/yyyy format*/
  private dateDisplay(val) {
    var date = new Date(val);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }
  private openDialog(key: any) {
    this.onRemove.emit(key);
  }

  private getBoatName(v) {
    return BoatNameConversionHelper.boatNameFromNumber(v);
  }

  private getImportanceName(v) {
    return ImportanceConversionHelper.importanceFromNumber(v);
  }

  private getBGColour(n:number){
    if(this.isDarkTheme){
      if(n == 3) return "#b61827"
      if(n == 2) return "#b53d00"
      if(n == 1) return "#c6a700"
      if(n == 0) return "#001064"
    }
    if(n == 3) return "#ff867c"
    if(n == 2) return "#ff8a50"
    if(n == 1) return "#fff263"
    if(n == 0) return "#6ab7ff"
  }
}
