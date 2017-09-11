import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { BoatUsageService } from '../boat-usage.service'
import { UsageInfo } from '../objects/usageInfo'
import { Boats } from '../Utils/menuNames'

const NUMBER_REGEX = /[0-9]+/;

@Component({
  selector: 'app-report-usage',
  templateUrl: './report-usage.component.html',
  styleUrls: ['./report-usage.component.css']
})
export class ReportUsageComponent {
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private usageService: BoatUsageService,
    private fb: FormBuilder,
    public snackBar: MdSnackBar
    )
    {
      this.dateAdapter.setLocale('en-nz');
      this.createForm();
    }

  title = "Report Boat Usage";
  maxDate = new Date();
  boats = Boats;
  usageForm: FormGroup;

  /** Build the form */
  private createForm() {
    this.usageForm = this.fb.group({
      boatID: ['', Validators.required],
      duration: ['', [Validators.required, Validators.pattern(/[0-9]+/), Validators.min(0)]],
      date: new FormControl({value:this.maxDate,disabled:true},Validators.required)
    });

    this.usageForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  /** Update error messages due to validation */
  private onValueChanged(data?: any) {
    if (!this.usageForm) { return; }
    const form = this.usageForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'boatID': '',
    'duration': '',
    'date': ''
  };

  validationMessages = {
    'boatID': {
      'required': 'Boat is required.'
    },
    'duration': {
      'required': 'Duration is required.',
      'min': 'Duration must be at least 0',
      'pattern': 'Duration must be at least 0'
    },
    'date': {
      'required': 'Date is required.'
    }
  };

  /** Build BreakageInfo Object from submited data */
  public onSubmit() {
    if (this.usageForm.valid) {
      let usage = new UsageInfo(this.usageForm.get("boatID").value, this.usageForm.get("duration").value, this.usageForm.get("date").value)
      this.usageService.addUsageInfo(usage).then(
        () => (
          this.snackBar.open("Usage Succesfully Submited", "Close", {
            duration: 2000,
          }),
          this.createForm()
        )
      )
        .catch(
        () =>
          this.snackBar.open("Something Went Wrong", "Close", {
            duration: 2000,
          })
        );
    }
  }
}
