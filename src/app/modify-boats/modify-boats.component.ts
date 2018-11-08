import { Component, OnInit } from '@angular/core';
import { Boat, BoatID } from '../Utils/objects/boat';
import { KnownBoatsService } from '../known-boats.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'modify-boats',
  templateUrl: './modify-boats.component.html',
  styleUrls: ['./modify-boats.component.css']
})
export class ModifyBoatsComponent implements OnInit {

  boatInfo: BoatID[];
  constructor(private BOATS: KnownBoatsService, private snackBar: MatSnackBar) {
    BOATS.boatInformation.subscribe(boats => {
      this.boatInfo = boats;
    });
  }

  ngOnInit() {
  }

  addItem() {
    this.boatInfo.push(new BoatID('', true));
  }

  setDocItem(updatedOriginalDocs) {
    const updatedDoc = updatedOriginalDocs.updatedDoc;
    const originalDoc = updatedOriginalDocs.originalDoc;
    originalDoc.id = this.BOATS.addOrUpdateDoc(updatedDoc);
    this.snackBar.open('Modified the boat', 'Undo', {
      duration: 2000,
    }).onAction().subscribe(() => {
      this.BOATS.restore(originalDoc);
    });
  }

}
