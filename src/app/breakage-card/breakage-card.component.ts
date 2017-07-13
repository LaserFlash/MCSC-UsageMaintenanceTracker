import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'breakage-card',
  templateUrl: './breakage-card.component.html',
  styleUrls: ['./breakage-card.component.css']
})
export class BreakageCardComponent{
  @Input() breakages: any;
  constructor() { }

  @Output() onRemove = new EventEmitter<boolean>();

  openDialog(key:any){
    this.onRemove.emit(key);
  }
}
