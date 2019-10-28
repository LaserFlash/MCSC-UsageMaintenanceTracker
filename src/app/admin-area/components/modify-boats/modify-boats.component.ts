import { Component, OnInit } from '@angular/core';
import { Boat, BoatID } from '../../../core/objects/boat';
import { KnownBoatsService } from '../../../core/constants/known-boats/known-boats.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'modify-boats',
  templateUrl: './modify-boats.component.html',
  styleUrls: ['./modify-boats.component.css']
})
/**
* Collapsable UI component that manages Boats
*   - Allows for adding new boats
*   - Editing current boat names
*   - Marking boats as active
*
**/
export class ModifyBoatsComponent implements OnInit {

  boatInfo: BoatID[];

  constructor(
    private BOATS: KnownBoatsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.BOATS.boatInformation.subscribe(boats => {
      this.boatInfo = boats;
    });
  }

  /* Create a new boat */
  addItem() {
    this.boatInfo.push(new BoatID('', true, true));
  }

  /* Commit changes to a current boat to DB (can also be used with a new boat) */
  setDocItem(updatedOriginalDocs) {

    const updatedDoc = updatedOriginalDocs.updatedDoc;
    const originalDoc = updatedOriginalDocs.originalDoc;

    originalDoc.id = this.BOATS.addOrUpdateDoc(updatedDoc); // Commit to DB

    this.snackBar.open('Modified the boat', 'Undo', {
      duration: 2000,
    }).onAction().subscribe(() => {
      this.BOATS.restore(originalDoc);
    });
  }

}
