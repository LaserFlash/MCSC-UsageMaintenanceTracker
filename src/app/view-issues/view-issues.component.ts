import { Component, OnInit } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo';
import { BoatBreakageService } from '../boat-breakage.service'

import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.css']
})
export class ViewIssuesComponent implements OnInit {

  constructor(
    private breakageService: BoatBreakageService
  ) {
    this.breakages = breakageService.items;
  }
  Allbreakages: BreakageInfo[];
  breakages: BreakageInfo[];
  sortList = ["Newest", "Oldest", "Most Important", "Least Important"];
  filterList = ["1", "2", "3", "4", "RIB"];
  appliedFilters = [];

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

  ngOnInit() {
  }

}
