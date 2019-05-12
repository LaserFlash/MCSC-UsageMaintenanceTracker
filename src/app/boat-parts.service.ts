import { Injectable } from '@angular/core';
import { DocLink } from './Utils/objects/docLink';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
/**
* Service that gets urls and titles for Healthy and Safety documnets from firebase
*/
export class BoatPartsService {
  private itemsCollection: AngularFirestoreCollection<DocLink>;
  public boatPartsLinks: DocLink[] = [];  // Collection of links order alphabetically

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<DocLink>('/boatSpecs', ref => ref.orderBy('title', 'desc'));
    this.itemsCollection.valueChanges().subscribe(val => {
      this.boatPartsLinks.length = 0;
      val.forEach(element => {
        this.boatPartsLinks.push(element);
      });
    });
  }
}
