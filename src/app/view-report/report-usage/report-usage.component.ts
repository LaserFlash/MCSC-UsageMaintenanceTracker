import { Component, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { BoatUsageService } from '../../boat-usage.service'
import { UsageInfo } from '../../Utils/objects/usageInfo'
import { Boats, UserFriendlyBoats } from '../../Utils/menuNames'
import { BoatNameConversionHelper } from '../../Utils/nameConversion'

const NUMBER_REGEX = /[0-9]+/;

@Component({
  selector: 'app-report-usage',
  templateUrl: './report-usage.component.html',
  styleUrls: ['./report-usage.component.css']
})
export class ReportUsageComponent {

  title = 'Report Boat Usage';
  maxDate = new Date();

  //TODO put in ngInit and dynamiclly set hour and minute
  private startTime = { hour: 7, minute: 15, meriden: 'AM', format: 12 };
  private endTime = { hour: 7, minute: 15, meriden: 'AM', format: 12 };

  boats = UserFriendlyBoats.filter((s, i) => {

    let yes = false;
    Boats.forEach(j => {
      yes ? true : yes = i === j;
    })
    return yes;
  });

  usageForm: FormGroup;

  formErrors = {
    'boatID': '',
    'date': '',
    'driver': ''
  };

  validationMessages = {
    'boatID': {
      'required': 'Boat is required.'
    },
    'date': {
      'required': 'Date is required.'
    },
    'driver': {
      'required': 'Driver / Skipper name is required.'
    }
  };

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private usageService: BoatUsageService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.dateAdapter.setLocale('en-nz');
    this.createForm();
  }

  /** Build the form */
  private createForm() {
    this.usageForm = this.fb.group({
      boatID: ['', Validators.required],
      date: new FormControl({ value: this.maxDate }, Validators.required),
      driver: ['', Validators.required],
      notableCrew: this.fb.array([this.createArrayCrew()]),
    });

    this.usageForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  private createArrayCrew(): FormGroup {
    return this.fb.group({
      name: ['', null]
    });
  }

  private addArrayCrew(): void {
    this.crew = this.usageForm.get('notableCrew') as FormArray;
    this.crew.push(this.createArrayCrew());
  }

  private removeCrew(i:number): void {
    if (i === undefined) return;
    this.crew = this.usageForm.get('notableCrew') as FormArray;
    this.crew.removeAt(i);
}


  /** Update error messages due to validation */
  private onValueChanged(data?: any) {
    if (!this.usageForm) { return; }
    const form = this.usageForm;

    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  /** Build BreakageInfo Object from submited data */
  public onSubmit() {
    if (this.usageForm.valid) {

      let crew = this.usageForm.get('notableCrew').value;
      const usage = new UsageInfo(
        BoatNameConversionHelper.numberFromUserFriendlyName(this.usageForm.get('boatID').value),
        this.buildTimeDate(this.usageForm.get('date').value, this.startTime),
        this.buildTimeDate(this.usageForm.get('date').value, this.endTime),
        null
        this.usageForm.get('driver').value,
        crew
      )

      this.usageService.addUsageInfo(usage).then(
        () => (
          this.snackBar.open('Usage Succesfully Submited', 'Close', {
            duration: 2000,
          }),
          this.createForm()
        )
      )
        .catch(
          () =>
            this.snackBar.open('Something Went Wrong', 'Close', {
              duration: 2000,
            })
        );

    }

  }

  /**
  * Given a time and a date combine them together
  **/
  private buildTimeDate(date: Date, time) {
    var hour = time.hour;
    var minutes = time.minute;

    if (time.format === 12) {
      if (time.meriden === 'PM') {
        if (hour !== 12) {
          hour += 12;
        }
      }
    }
    let timeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);
    return timeDate;
  }
}
