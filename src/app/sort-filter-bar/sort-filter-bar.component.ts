import { Component, Input } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo';
import { BoatBreakageService } from '../boat-breakage.service'

@Component({
  selector: 'sort-filter-bar',
  templateUrl: './sort-filter-bar.component.html',
  styleUrls: ['./sort-filter-bar.component.css']
})
export class SortFilterBarComponent {
  @Input() breakages: BreakageInfo[];
  @Input() original: BreakageInfo[];
  constructor(private breakageService: BoatBreakageService, ) { }

  sortList = ["Newest", "Oldest", "Most Important", "Least Important", "Boat"];
  filterList = ["1", "2", "3", "4", "RIB"];
  partfilterList = [
    "Sails",
    "Hull",
    "Deck Fittings",
    "Mast",
    "Boom",
    "Halyards / Sheets",
    "Rudder / Tiller",
    "Control Lines",
    "Cover",
    "Other"
  ];
  appliedFilters = [];
  partappliedFilters = [];
  sortBy = "Sort by";

  addFilter(key: string) {
    var i = this.appliedFilters.indexOf(key);
    if (i != -1) {
      this.appliedFilters.splice(i, 1);
    } else {
      this.appliedFilters.push(key);
    }

    var filtered;

    if (this.appliedFilters.length == 0) {
      filtered = this.original.filter(item => this.partFilter(item));
    } else {
      filtered = this.original.filter(item => this.boatFilter(item)).filter(item => this.partFilter(item));
    }


    this.breakages.splice(0, this.breakages.length);

    for (var i = 0; i < filtered.length; i++) {
      this.breakages.push(filtered[i]);
    }
  }

  addPartFilter(key: string) {
    var i = this.partappliedFilters.indexOf(key);
    if (i != -1) {
      this.partappliedFilters.splice(i, 1);
    } else {
      this.partappliedFilters.push(key);
    }

    var filtered;

    if (this.partappliedFilters.length == 0) {
      filtered = this.original.filter(item => this.boatFilter(item));
    } else {
      filtered = this.breakages.filter(item => this.partFilter(item)).filter(item => this.boatFilter(item));
    }

    this.breakages.splice(0, this.breakages.length);

    for (var i = 0; i < filtered.length; i++) {
      this.breakages.push(filtered[i]);
    }
  }

  boatFilter(item) {
    if (this.appliedFilters.length == 0) {
      return true;
    }
    return this.appliedFilters.some(
      filter => {
        if (item.boatID == filter) {
          return true;
        }
      });
  }
  partFilter(item) {
    if (this.partappliedFilters.length == 0) {
      return true;
    }
    return this.partappliedFilters.some(
      filter => {
        if (item.part == filter) {
          return true;
        }
      });
  }

  changeSort(sort: string) {
    this.sortBy = sort;
    if (sort == "Newest") {
      this.breakages.sort((a, b) => { return b.timestamp - a.timestamp; });
    } else if (sort == "Oldest") {
      this.breakages.sort((a, b) => { return a.timestamp - b.timestamp; });
    } else if (sort == "Boat") {
      this.breakages.sort((a, b) => { return a.boatID.charCodeAt(0) - b.boatID.charCodeAt(0); });
    } else {
      if (sort == "Most Important") {
        this.breakages.sort((a, b) => {
          var aimp;
          if (a.importance.startsWith("U")) { aimp = 0; }
          else if (a.importance.startsWith("H")) { aimp = 1; }
          else if (a.importance.startsWith("M")) { aimp = 2; }
          else { aimp = 3; }
          var bimp;
          if (b.importance.startsWith("U")) { bimp = 0; }
          else if (b.importance.startsWith("H")) { bimp = 1; }
          else if (b.importance.startsWith("M")) { bimp = 2; }
          else { bimp = 3; }
          return aimp - bimp;
        });
      } else if (sort == "Least Important") {
        this.breakages.sort((a, b) => {
          var aimp;
          if (a.importance.startsWith("U")) { aimp = 0; }
          else if (a.importance.startsWith("H")) { aimp = 1; }
          else if (a.importance.startsWith("M")) { aimp = 2; }
          else { aimp = 3; }
          var bimp;
          if (b.importance.startsWith("U")) { bimp = 0; }
          else if (b.importance.startsWith("H")) { bimp = 1; }
          else if (b.importance.startsWith("M")) { bimp = 2; }
          else { bimp = 3; }
          return bimp - aimp;
        });
      }
    }
  }

}
