import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakageInfo } from '../objects/breakageInfo'
import { UserFriendlyBoats } from '../Utils/menuNames'
import { BoatNameConversionHelper, ImportanceConversionHelper } from '../Utils/nameConversion'

@Component({
  selector: 'breakage-card',
  templateUrl: './breakage-card.component.html',
  styleUrls: ['./breakage-card.component.css']
})
export class BreakageCardComponent {
  constructor() { }

  @Input() buttonText: string;
  @Input() breakages: BreakageInfo[];
  @Output() onRemove = new EventEmitter<boolean>();

  /**Generate string to represent timestamp dd/mm/yyyy format*/
  private dateDisplay(val) {
    var date = new Date(val);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }
  private openDialog(key: any) {
    this.onRemove.emit(key);
  }

  private getBoatName(v) {
    return BoatNameConversionHelper.boatNameFromNumber(v);
  }

  private getImportanceName(v) {
    return ImportanceConversionHelper.importanceFromNumber(v);
  }
}
