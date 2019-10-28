import { Component, OnInit } from '@angular/core';

import { BoatPartsService } from '../../shared/boat-parts/boat-parts.service';
import { DocLink } from '../../../core/objects/docLink';

@Component({
  selector: 'app-boat-parts',
  templateUrl: './boat-parts.component.html',
  styleUrls: ['./boat-parts.component.css']
})
export class BoatPartsComponent implements OnInit {
  links: DocLink[];
  constructor(private boatPartsService: BoatPartsService, ) {}

  ngOnInit() {
    this.links = this.boatPartsService.boatPartsLinks;
  }

}
