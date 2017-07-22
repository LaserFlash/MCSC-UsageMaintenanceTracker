import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo'

@Component({
  selector: 'breakage-card',
  templateUrl: './breakage-card.component.html',
  styleUrls: ['./breakage-card.component.css']
})
export class BreakageCardComponent {
  @Input() buttonText: string;
  @Input() breakages: BreakageInfo[];
  constructor() { }

  @Output() onRemove = new EventEmitter<boolean>();

  dateDisplay(val) {
    var date = new Date(val);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  }
  openDialog(key: any) {
    this.onRemove.emit(key);
  }
}
