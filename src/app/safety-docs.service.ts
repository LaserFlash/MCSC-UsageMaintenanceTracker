import { Injectable } from '@angular/core';
import { DocLink } from './objects/docLink';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SafetyDocsService {
  private itemsCollection: AngularFirestoreCollection<DocLink>;
  public safetyDocLinks: DocLink[] = [];

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<DocLink>('/safetyDocs', ref => ref.orderBy("title","desc"));
    this.itemsCollection.valueChanges().subscribe(val => {
      this.safetyDocLinks.length = 0;
      val.forEach(element => {
          console.log(this.safetyDocLinks)
        this.safetyDocLinks.push(element);
      });
    });
      console.log(this.safetyDocLinks)
  }
}
