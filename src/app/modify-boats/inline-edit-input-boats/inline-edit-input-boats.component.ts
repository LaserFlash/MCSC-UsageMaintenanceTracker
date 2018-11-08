import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Boat } from '../../Utils/objects/boat';

@Component({
  selector: 'app-inline-edit-input-boats',
  templateUrl: './inline-edit-input-boats.component.html',
  styleUrls: ['./inline-edit-input-boats.component.css']
})
export class InlineEditInputBoatsComponent implements OnInit {

  @Input() value: Boat;
  @Output() update: EventEmitter<{ updatedDoc: Boat, originalDoc: Boat }>
    = new EventEmitter<{ updatedDoc: Boat, originalDoc: Boat }>();

  updatedDoc: Boat;
  title: string;
  remove = false;
  done = false;
  constructor() { }

  ngOnInit() {
    this.updatedDoc = Object.assign({}, this.value);
  }

  submitEdit() {
    this.done = true;
    this.update.emit({ updatedDoc: this.updatedDoc, originalDoc: this.value });
  }

}
