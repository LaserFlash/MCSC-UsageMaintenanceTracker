import { Component, Input } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo';
import { BoatBreakageService } from '../boat-breakage.service'

import { Boats,Parts } from '../Utils/menuNames'

@Component({
  selector: 'sort-filter-bar',
  templateUrl: './sort-filter-bar.component.html',
  styleUrls: ['./sort-filter-bar.component.css']
})

export class SortFilterBarComponent {
  @Input() breakages: BreakageInfo[];
  @Input() original: BreakageInfo[];

  constructor(private breakageService: BoatBreakageService) {}

  sortList:string[] = ["Newest", "Oldest", "Most Important", "Least Important", "Boat"];
  filterList:number[] = Boats;
  partfilterList:string[] = Parts;
  appliedFilters:string[] = [];
  partappliedFilters:string[] = [];
  sortBy:string = "Sort by";

  /** Add a boat filter to the displayed data */
  private addFilter(key: string) {
    let index = this.appliedFilters.indexOf(key);
    /* Remove filter if already applied */
    if (index != -1) {
      this.appliedFilters.splice(index, 1);
    } else {
      this.appliedFilters.push(key);  //add filter
    }

    let filtered;
    /* Apply filters taking into account any part filters also applied */
    if (this.appliedFilters.length == 0) {
      filtered = this.original.filter(item => this.partFilter(item));
    } else {
      filtered = this.original.filter(item => this.boatFilter(item)).filter(item => this.partFilter(item));
    }

    this.breakages.splice(0, this.breakages.length);
    for (let i = 0; i < filtered.length; i++) {
      this.breakages.push(filtered[i]);
    }
  }

  /** Add a part filter to the displayed data */
  private addPartFilter(key: string) {
    let index = this.partappliedFilters.indexOf(key);
    /* Remove filter if already applied */
    if (index != -1) {
      this.partappliedFilters.splice(index, 1);
    } else {
      this.partappliedFilters.push(key);
    }

    let filtered;
    /* Apply filters taking into account any boat filters also applied */
    if (this.partappliedFilters.length == 0) {
      filtered = this.original.filter(item => this.boatFilter(item));
    } else {
      filtered = this.breakages.filter(item => this.partFilter(item)).filter(item => this.boatFilter(item));
    }

    this.breakages.splice(0, this.breakages.length);
    for (let i = 0; i < filtered.length; i++) {
      this.breakages.push(filtered[i]);
    }
  }

  /** Get the data that meets the filter */
  private boatFilter(item) {
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

  /** Get the data that meets the filter */
  private partFilter(item) {
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

  /** Sort the data */
  private changeSort(sort: string) {
    this.sortBy = sort;
    if (sort == "Newest") {
      this.breakages.sort((a, b) => { return b.timestamp.getDate() - a.timestamp.getDate(); });
    } else if (sort == "Oldest") {
      this.breakages.sort((a, b) => { return a.timestamp.getDate() - b.timestamp.getDate(); });
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
