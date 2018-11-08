import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakageInfo } from '../../Utils/objects/breakageInfo';

import { ImportanceConversionHelper } from '../../Utils/nameConversion';
import { DialogsService } from '../dialog/dialogs.service';
import { ThemeTrackerService } from '../../theme-tracker.service';

import { KnownBoatsService } from '../../known-boats.service';

@Component({
  selector: 'breakage-card',
  templateUrl: './breakage-card.component.html',
  styleUrls: ['./breakage-card.component.css']
})
export class BreakageCardComponent {
  isDarkTheme: boolean;

  @Input() buttonText: string;
  @Input() breakages: BreakageInfo[];
  @Output() onRemove = new EventEmitter<boolean>();

  constructor(
    private themeTracker: ThemeTrackerService,
    private dialogsService: DialogsService,
    private BOATS: KnownBoatsService
  ) {
    this.isDarkTheme = themeTracker.isDark;
  }

  private openDialog(key: any) {
    this.onRemove.emit(key);
  }

  private getBoatName(v) {
    return this.BOATS.getBoatName(v);
  }

  private getImportanceName(v) {
    return ImportanceConversionHelper.importanceFromNumber(v);
  }

  private getBGColour(n: number) {
    if (this.isDarkTheme) {
      if (n === 3) { return '#B85750'; }
      if (n === 2) { return '#964f00'; }
      if (n === 1) { return '#D5A253'; }
      if (n === 0) { return '#68768A'; }
    }
    if (n === 3) { return '#ff867c'; }
    if (n === 2) { return '#ff8a50'; }
    if (n === 1) { return '#fff263'; }
    if (n === 0) { return '#6ab7ff'; }
  }

  private getUnderlay(s: string) {
    return s.replace('/', ':');
  }

  private openModal(id: string) {
    const base = 'https://res.cloudinary.com/dhnh6uqep/image/upload/q_auto//url';
    this.dialogsService.imageModal(base.replace('url', id));
  }

  private makeDate(date: any) {
    try {
      return date.toDate();
    } catch (error) {
      return date;
    }

  }
}
