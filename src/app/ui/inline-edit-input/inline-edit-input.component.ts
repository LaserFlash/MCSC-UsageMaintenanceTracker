import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocLinkID } from '../../core/objects/docLink';

@Component({
  selector: 'app-inline-edit-input',
  templateUrl: './inline-edit-input.component.html',
  styleUrls: ['./inline-edit-input.component.css']
})
export class InlineEditInputComponent implements OnInit {

  @Input() value: DocLinkID;
  @Output() update: EventEmitter<{ updatedDoc: DocLinkID, originalDoc: DocLinkID }>
    = new EventEmitter<{ updatedDoc: DocLinkID, originalDoc: DocLinkID }>();
  @Output() delete: EventEmitter<DocLinkID> = new EventEmitter<DocLinkID>();

  updatedDoc: DocLinkID;
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

  submitRemove() {
    this.remove = true;
    this.delete.emit(this.value);
  }

}
