import { Component } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo';
import { BoatBreakageService } from '../boat-breakage.service'

import { DialogsService } from '../dialog/dialogs.service';

import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.css']
})
export class ViewIssuesComponent{

  constructor(
    private breakageService: BoatBreakageService,
    private dialogsService: DialogsService
  ) {
    this.breakages = breakageService.items;
  }
  Allbreakages: BreakageInfo[];
  breakages: BreakageInfo[];
  sortList = ["Newest", "Oldest", "Most Important", "Least Important","Boat"];
  filterList = ["1", "2", "3", "4", "RIB"];
  appliedFilters = [];
  sortBy = "Sort by";

  cardButtonText = "Fix";

  addFilter(key: string) {
    var i = this.appliedFilters.indexOf(key);
    if (i != -1) {
      this.appliedFilters.splice(i, 1);
    } else {
      this.appliedFilters.push(key);
    }

    if (this.appliedFilters.length == 0) {
      this.breakages = this.breakageService.items;
      return;
    }

    this.breakages = this.breakageService.items.filter(
      item => {
        return this.appliedFilters.some(
          filter => {
            if (item.boatID == filter) {
              return true;
            }
          });
      });

  }

  changeSort(sort: string) {
    this.sortBy = sort;
    if (sort == "Newest") {
      this.breakages.sort((a, b) => { return b.timestamp - a.timestamp; });
    } else if (sort == "Oldest") {
      this.breakages.sort((a, b) => { return a.timestamp - b.timestamp; });
    }else if (sort == "Boat") {
      this.breakages.sort((a, b) => { return a.boatID.charCodeAt(0)-b.boatID.charCodeAt(0); });
    } else {
      if (sort == "Most Important") {
        this.breakages.sort((a, b) => {
          var aimp;
          if (a.importance.startsWith("U")) {aimp = 0;}
          else if (a.importance.startsWith("H")) {aimp = 1;}
          else if (a.importance.startsWith("M")) {aimp = 2;}
          else {aimp = 3;}
          var bimp;
          if (b.importance.startsWith("U")) { bimp = 0;}
          else if (b.importance.startsWith("H")) {bimp = 1;}
          else if (b.importance.startsWith("M")) {bimp = 2;}
          else {bimp = 3;}
          return aimp - bimp;
        });
      } else if (sort == "Least Important") {
        this.breakages.sort((a, b) => {
          var aimp;
          if (a.importance.startsWith("U")) {aimp = 0;}
          else if (a.importance.startsWith("H")) {aimp = 1;}
          else if (a.importance.startsWith("M")) {aimp = 2;}
          else {aimp = 3;}
          var bimp;
          if (b.importance.startsWith("U")) { bimp = 0;}
          else if (b.importance.startsWith("H")) {bimp = 1;}
          else if (b.importance.startsWith("M")) {bimp = 2;}
          else {bimp = 3;}
          return bimp - aimp;
        });
      }
    }
  }

  openDialog(key: any) {
    this.dialogsService
      .confirm('Confirm Mark as Fixed', 'Are you sure you want to do this?', this.cardButtonText)
      .subscribe(result => {
        if (result){
          this.breakageService.markFixed(key);
        }
    });
  }

}
