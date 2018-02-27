import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: '../shared/standard-secondary-route/standard-secondary-route.html',
  styleUrls: ['../shared/standard-secondary-route/standard-secondary-route.css']
})
export class DocsComponent implements OnInit {
  routeLinks = [
    {label: 'Health & Safety' , link: ['safety']},
    {label: 'Parts' , link: ['parts']},
  ]
  constructor() { }

  ngOnInit() {
  }

}
