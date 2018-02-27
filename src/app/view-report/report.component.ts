import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: '../shared/standard-secondary-route/standard-secondary-route.html',
  styleUrls: ['../shared/standard-secondary-route/standard-secondary-route.css']
})
export class ReportComponent implements OnInit {
  routeLinks = [
    {label: 'Usage' , link: ['usage']},
    {label: 'Breakages' , link: ['issue']},
    {label: 'Incidents' , link: ['incident']},
  ]

  constructor() { }

  ngOnInit() {
  }



}
