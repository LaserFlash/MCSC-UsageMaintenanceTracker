import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo'

@Component({
  selector: 'breakage-card',
  templateUrl: './breakage-card.component.html',
  styleUrls: ['./breakage-card.component.css']
})
export class BreakageCardComponent{
  @Input() buttonText: string;
  @Input() breakages: BreakageInfo[];
  constructor() { }

  @Output() onRemove = new EventEmitter<boolean>();

  openDialog(key:any){
    this.onRemove.emit(key);
  }
}
