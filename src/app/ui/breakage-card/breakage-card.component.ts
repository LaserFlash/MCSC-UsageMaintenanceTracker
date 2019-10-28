import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { BreakageInfo } from '../../core/objects/breakageInfo';
import { ImportanceConversionHelper } from '../../core/constants/menu-names/nameConversion';

import { KnownBoatsService } from '../../core/constants/known-boats/known-boats.service';
import { DialogsService } from './dialog/dialogs.service';
import { ThemeTrackerService } from '../../core/theme/theme-tracker.service';

@Component({
  selector: 'breakage-card',
  templateUrl: './breakage-card.component.html',
  styleUrls: ['./breakage-card.component.css']
})
export class BreakageCardComponent implements OnInit {
  isDarkTheme: boolean;

  @Input() buttonText: string;
  @Input() breakages: BreakageInfo[];
  @Output() remove = new EventEmitter<boolean>();

  constructor(
    private themeTracker: ThemeTrackerService,
    private dialogsService: DialogsService,
    private BOATS: KnownBoatsService
  ) {
    /* Apply theme at start & whenever a change*/
    this.themeTracker.isDark.subscribe((dark) => {
      this.isDarkTheme = dark;
    });
  }

  ngOnInit() {

  }

  private openDialog(key: any) {
    this.dialogsService
      .confirm('Confirm Mark as Fixed', 'Are you sure you want to do this?', this.buttonText)
      .subscribe(result => {
        if (result) {
          this.remove.emit(key);
        }
      });

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
