/**
* Object intended to store a a boat and how the databse treats it
*/
export class Boat {
  constructor(
    public name: string,
    public selectable: boolean,
  ) { }
}

export class BoatID extends Boat {
  id: string;
}
