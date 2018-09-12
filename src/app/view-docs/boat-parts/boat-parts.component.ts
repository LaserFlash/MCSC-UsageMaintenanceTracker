import { Component, OnInit } from '@angular/core';

import { BoatPartsService } from '../../boat-parts.service';
import { DocLink } from '../../Utils/objects/docLink';

@Component({
  selector: 'app-boat-parts',
  templateUrl: './boat-parts.component.html',
  styleUrls: ['./boat-parts.component.css']
})
export class BoatPartsComponent implements OnInit {
  links: DocLink[];
  constructor(private boatPartsService: BoatPartsService, ) {
    this.links = boatPartsService.boatPartsLinks;
  }

  ngOnInit() {
  }

}
