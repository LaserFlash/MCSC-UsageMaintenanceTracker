import { Injectable } from '@angular/core';
import { DocLink, DocLinkID } from '../../../core/objects/docLink';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
/**
* Service that gets urls and titles for Healthy and Safety documnets from firebase
*/
export class SafetyDocsService {
  private itemsCollection: AngularFirestoreCollection<DocLink>;
  public safetyDocLinks: DocLinkID[] = [];  // Collection of links order alphabetically

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<DocLink>('/safetyDocs', ref => ref.orderBy('title', 'desc'));
    let items: Observable<DocLinkID[]>;
    items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as DocLinkID;
          const id = action.payload.doc.id;
          return { ...data, id };
        });
      })
    );

    items.subscribe((doc) => {
      this.safetyDocLinks.length = 0;
      doc.forEach(element => {
        this.safetyDocLinks.push(element);
      });
    });
  }

  public addOrUpdateDoc(doc: DocLinkID): string {
    if (!doc.id) { doc.id = this.db.createId(); }
    if (doc.url === '' && doc.title === '') {
      this.deleteDoc(doc);
    } else {
      this.itemsCollection.doc(doc.id).set({ url: doc.url, title: doc.title }, { merge: true });
    }
    return doc.id;
  }

  public deleteDoc(doc: DocLinkID) {
    this.itemsCollection.doc(doc.id).delete();
  }

  public restore(doc: DocLinkID) {
    if (doc.url === '' && doc.title === '') {
      this.deleteDoc(doc);
    } else {
      this.itemsCollection.doc(doc.id).set({ url: doc.url, title: doc.title }, { merge: true });
    }
  }
}
