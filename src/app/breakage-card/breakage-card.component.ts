import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo'
import { UserFriendlyBoats } from '../Utils/menuNames'
import { BoatNameConversionHelper, ImportanceConversionHelper } from '../Utils/nameConversion'

import { DialogsService } from '../dialog/dialogs.service';


import { ThemeTrackerService } from '../theme-tracker.service'

@Component({
  selector: 'breakage-card',
  templateUrl: './breakage-card.component.html',
  styleUrls: ['./breakage-card.component.css']
})
export class BreakageCardComponent {
  constructor(
    private themeTracker: ThemeTrackerService,
    private dialogsService: DialogsService
  ) {
    this.isDarkTheme = themeTracker.isDark;
  }

  isDarkTheme: boolean;

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

  private getBGColour(n: number) {
    if (this.isDarkTheme) {
      if (n == 3) return "#B85750"
      if (n == 2) return "#964f00"
      if (n == 1) return "#D5A253"
      if (n == 0) return "#68768A"
    }
    if (n == 3) return "#ff867c"
    if (n == 2) return "#ff8a50"
    if (n == 1) return "#fff263"
    if (n == 0) return "#6ab7ff"
  }

  private getUnderlay(s: string) {
    return s.replace("/", ":");
  }

  private openModal(id: string) {
    let base = "https://res.cloudinary.com/dhnh6uqep/image/upload/q_auto//url"
    this.dialogsService.imageModal(base.replace("url",id));
  }
}
