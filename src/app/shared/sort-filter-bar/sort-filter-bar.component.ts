import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BreakageInfo } from '../../Utils/objects/breakageInfo';
import { BoatBreakageService } from '../../boat-breakage.service';

import { Parts } from '../../Utils/menuNames'
import { KnownBoatsService } from '../../known-boats.service'

@Component({
  selector: 'sort-filter-bar',
  templateUrl: './sort-filter-bar.component.html',
  styleUrls: ['./sort-filter-bar.component.css']
})

export class SortFilterBarComponent implements OnInit {
  @Input() breakages: BreakageInfo[];
  @Input() original: BreakageInfo[];

  @ViewChild('startPicker') startPicker: ElementRef;
  @ViewChild('endPicker') endPicker: ElementRef;

  sortList: string[] = ['Newest', 'Oldest', 'Most Important', 'Least Important', 'Boat'];
  filterList;

  partfilterList: string[] = Parts;
  appliedFilters: string[] = [];
  partappliedFilters: string[] = [];
  sortBy = 'Sort by';

  startMaxDate: Date = new Date();
  endMaxDate: Date = new Date();
  endMinDate: Date = new Date(1997, 8, 27);

  constructor(private breakageService: BoatBreakageService, private BOATS: KnownBoatsService) { }
  ngOnInit() {
    this.BOATS.boatInformation.subscribe(boats => {
      this.filterList = boats;
    });
    this.resetFilter()
  }

  clearDates() {
    this.startMaxDate = new Date();
    this.endMaxDate = new Date();
    this.endMinDate = new Date(1997, 8, 27);
    this.startPicker.nativeElement.value = ' ';
    this.endPicker.nativeElement.value = ' ';
    this.filter();
  }

  selectStart(date: any) {
    this.endMinDate = date.value;
    this.filter();
  }

  selectEnd(date: any) {
    this.startMaxDate = date.value;
    this.filter();
  }

  private resetFilter() {
    this.breakages.splice(0, this.breakages.length);
    for (let i = 0; i < this.original.length; i++) {
      this.breakages.push(this.original[i]);
    }
  }

  private filter() {
    let filtered;
    /* Apply filters taking into account any boat filters also applied */
    filtered = this.original.filter(item => this.partFilter(item)).filter(item => this.boatFilter(item)).filter(item => this.timeFilter(item));

    this.breakages.splice(0, this.breakages.length);
    for (let i = 0; i < filtered.length; i++) {
      this.breakages.push(filtered[i]);
    }
    this.sort();
  }

  /** Add a boat filter to the displayed data */
  private addFilter(key: string) {
    const index = this.appliedFilters.indexOf(key);
    /* Remove filter if already applied */
    if (index != -1) {
      this.appliedFilters.splice(index, 1);
    } else {
      this.appliedFilters.push(key);  // add filter
    }

    this.filter();
  }

  /** Add a part filter to the displayed data */
  private addPartFilter(key: string) {
    const index = this.partappliedFilters.indexOf(key);
    /* Remove filter if already applied */
    if (index != -1) {
      this.partappliedFilters.splice(index, 1);
    } else {
      this.partappliedFilters.push(key);
    }
    this.filter()
  }

  /** Get the data that meets the filter */
  private boatFilter(item) {
    if (this.appliedFilters.length === 0) {
      return true;
    }
    return this.appliedFilters.some(
      filter => {
        if (String(item.boatID) === String(filter)) {
          return true;
        }
      });
  }

  /** Get the data that meets the filter */
  private partFilter(item) {
    if (this.partappliedFilters.length === 0) {
      return true;
    }
    return this.partappliedFilters.some(
      filter => {
        if (item.part === filter) {
          return true;
        }
      });
  }

  private timeFilter(item) {
    return item.timestamp.toDate() >= this.endMinDate && item.timestamp.toDate() <= this.startMaxDate;
  }

  private changeSort(sort: string) {
    this.sortBy = sort;
    this.sort();
  }
  /** Sort the data */
  private sort() {
    const sort = this.sortBy;
    if (sort === 'Newest') {
      this.breakages.sort((a, b) => {
        if (a.timestampFixed != undefined && b.timestampFixed != undefined) {
          return b.timestampFixed.toDate().getTime() - a.timestampFixed.toDate().getTime();
        }
        return b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime();
      });
    } else if (sort === 'Oldest') {
      this.breakages.sort((a, b) => {
        if (a.timestampFixed != undefined && b.timestampFixed != undefined) {
          return a.timestampFixed.toDate().getTime() - b.timestampFixed.toDate().getTime();
        }
        return a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime();
      });
    } else if (sort === 'Boat') {
      this.breakages.sort((a, b) => a.boatID - b.boatID);
    } else {
      if (sort === 'Most Important') {
        this.breakages.sort((a, b) => b.importance - a.importance);
      } else if (sort === 'Least Important') {
        this.breakages.sort((a, b) => a.importance - b.importance);
      }
    }
  }
}
