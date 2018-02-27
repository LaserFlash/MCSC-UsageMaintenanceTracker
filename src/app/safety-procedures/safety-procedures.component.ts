import { Component } from '@angular/core';
import { DocLink } from '../Utils/objects/docLink';

import { SafetyDocsService } from '../safety-docs.service'

@Component({
  selector: 'app-safety-procedures',
  templateUrl: './safety-procedures.component.html',
  styleUrls: ['./safety-procedures.component.css']
})
export class SafetyProceduresComponent {
  links: DocLink[];
  constructor(private safetyDocsService: SafetyDocsService,) {
    this.links = safetyDocsService.safetyDocLinks;
  }
}
