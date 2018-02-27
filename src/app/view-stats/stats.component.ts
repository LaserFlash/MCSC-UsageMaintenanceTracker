import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: '../shared/standard-secondary-route/standard-secondary-route.html',
  styleUrls: ['../shared/standard-secondary-route/standard-secondary-route.css']
})
export class StatsComponent implements OnInit {
  routeLinks = [
    {label: 'Usage' , link: ['usage']},
    {label: 'Breakages' , link: ['issue']},
    {label: 'Fixed' , link: ['fixed']}
  ]
  constructor() { }

  ngOnInit() {
  }

}
