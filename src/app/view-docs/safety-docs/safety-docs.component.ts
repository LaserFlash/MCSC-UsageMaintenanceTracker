import { Component, OnInit } from '@angular/core';
import { DocLink } from '../../Utils/objects/docLink';

import { SafetyDocsService } from '../../safety-docs.service'

@Component({
  selector: 'app-safety-docs',
  templateUrl: './safety-docs.component.html',
  styleUrls: ['./safety-docs.component.css']
})
export class SafetyDocsComponent implements OnInit {
  links: DocLink[];
  constructor(private safetyDocsService: SafetyDocsService,) {
    this.links = safetyDocsService.safetyDocLinks;
  }

  ngOnInit() {
  }

}
