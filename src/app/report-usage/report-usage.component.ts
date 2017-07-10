import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';


const NUMBER_REGEX = /[0-9]+/;

@Component({
  selector: 'app-report-usage',
  templateUrl: './report-usage.component.html',
  styleUrls: ['./report-usage.component.css']
})
export class ReportUsageComponent implements OnInit {
  title = "Report Boat Usage";
  maxDate = new Date();
  boats = [
    '1', '2', '3', '4'
  ];


  usageForm: NgForm;
  @ViewChild('usageForm') currentForm: NgForm;
  ngAfterViewChecked() {
    this.formChanged();
  }
  formChanged() {
    this.usageForm = this.currentForm;
  }
  selectedBoat: string;
  duration: Number;
  date: Date;

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-nz');
  }

  ngOnInit() {
  }

  durationFormControl = new FormControl('', [Validators.required, Validators.pattern(NUMBER_REGEX)]);
  dateFormControl = new FormControl('', [Validators.required, Validators.nullValidator]);
  boatFormControl = new FormControl('', [Validators.required, Validators.nullValidator]);

  onSubmit() {
    if (this.durationFormControl.valid && this.dateFormControl.valid && this.boatFormControl.valid) {
      console.log("Form Submitted!");
      this.usageForm.reset();
    }
  }

}
