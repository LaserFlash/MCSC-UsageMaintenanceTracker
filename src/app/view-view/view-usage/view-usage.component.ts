import { Component, OnInit } from '@angular/core';

import { BoatUsageService } from '../../boat-usage.service'
import { UsageInfo } from '../../Utils/objects/usageInfo'
import { Boats, UserFriendlyBoats } from '../../Utils/menuNames'
import { BoatNameConversionHelper } from '../../Utils/nameConversion'

@Component({
  selector: 'app-view-usage',
  templateUrl: './view-usage.component.html',
  styleUrls: ['./view-usage.component.css']
})
export class ViewUsageComponent implements OnInit {

  boats = UserFriendlyBoats.filter((s, i) => {
    let yes = false;
    Boats.forEach(j => {
      yes ? true : yes = i === j;
    })
    return yes;
  });

  constructor(
    private usageService: BoatUsageService,
    ) {}

  ngOnInit() {
  }

}
