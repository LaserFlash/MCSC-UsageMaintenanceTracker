import { Injectable } from '@angular/core';
import { Boat, BoatID } from '../../objects/boat';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class KnownBoatsService {
  private itemsCollection: AngularFirestoreCollection<Boat>;
  private boats: BoatID[];
  public boatInformation: BehaviorSubject<BoatID[]> = new BehaviorSubject([]);


  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<Boat>('/boats', ref => ref.orderBy('name', 'asc'));
    let items: Observable<BoatID[]>;
    items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as BoatID;
          const id = action.payload.doc.id;
          return { ...data, id };
        });
      })
    );

    items.subscribe((doc) => {
      const currentBoats: BoatID[] = [];
      doc.forEach(element => {
        currentBoats.push(element);
      });
      this.boatInformation.next(currentBoats);
    });

    this.boatInformation.subscribe((boats) => {
      this.boats = boats;
    });
  }

  public addOrUpdateDoc(boat: BoatID): string {
    if (!boat.id) { boat.id = this.db.createId(); }
    this.itemsCollection.doc(boat.id).set({ name: boat.name, selectable: boat.selectable }, { merge: true });

    return boat.id;
  }

  public restore(boat: BoatID) {
    if (boat.name === '') {
      this.deleteDoc(boat);
    } else {
      this.itemsCollection.doc(boat.id).set({ name: boat.name, selectable: boat.selectable }, { merge: true });
    }
  }

  public deleteDoc(boat: BoatID) {
    this.itemsCollection.doc(boat.id).delete();
  }

  getBoatName(key: string): string {
    const boatFound = this.boats.find((boat) => {
      return boat.id === String(key);
    });
    if (boatFound) {
      return boatFound.name;
    } else {
      return 'Unknown Name';
    }
  }
}
