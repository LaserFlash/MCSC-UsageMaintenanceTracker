import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: '../shared/standard-secondary-route/standard-secondary-route.html',
  styleUrls: ['../shared/standard-secondary-route/standard-secondary-route.css']
})
export class ViewComponent implements OnInit {

  routeLinks = [
    {label: 'Usage' , link: ['usage']},
    {label: 'Breakages' , link: ['issue']},
    {label: 'Fixed' , link: ['fixed']}
  ]

  constructor() { }

  ngOnInit() {
  }

}
