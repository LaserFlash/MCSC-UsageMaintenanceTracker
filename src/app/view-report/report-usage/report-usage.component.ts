import { Component, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { MatStepper } from '@angular/material';

import { BoatUsageService } from '../../boat-usage.service'
import { UsageInfo } from '../../Utils/objects/usageInfo'
import { Boats, UserFriendlyBoats, WindTypes, WindDirection, WaterState } from '../../Utils/menuNames'
import { BoatNameConversionHelper, WindSpeedConversionHelper, WindDirectionConversionHelper, WaterStateConversionHelper } from '../../Utils/nameConversion'

const NUMBER_REGEX = /[0-9]+/;

@Component({
  selector: 'app-report-usage',
  templateUrl: './report-usage.component.html',
  styleUrls: ['./report-usage.component.css']
})
export class ReportUsageComponent {

  @ViewChild('stepper') stepper: MatStepper;

  title = 'Report Boat Usage';
  maxDate = new Date();

  isLinear = true;

  windSpeed = WindTypes;
  windDirection = WindDirection;
  waterState = WaterState;

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
    'driver': '',
    'windSpeed': '',
    'windDirection': '',
    'waterState': ''
  };

  validationMessages = {
    'boatID': {
      'required': 'You must select a boat.'
    },
    'startTime': {
      'required': 'Start time is required'
    },
    'endTime': {
      'required': 'End time is required'
    },
    'date': {
      'required': 'Date is required.'
    },
    'driver': {
      'required': 'Driver / Skipper name is required.'
    },
    'windSpeed': {
      'required': 'An item must be selected'
    },
    'windDirection': {
      'required': 'An item must be selected'
    },
    'waterState': {
      'required': 'An item must be selected'
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
      formArray: this.fb.array([
        this.fb.group({
          boatID: ['', Validators.required],
        }),
        this.fb.group({
          startTime: ['', Validators.required],
          endTime: ['', Validators.required],
          date: new FormControl({ value: this.maxDate }, Validators.required)
        }, { validator: this.checkDateRange.bind(this) }),
        this.fb.group({
          driver: ['', Validators.required],
          notableCrew: this.fb.array([this.createArrayCrew()]),
        }),
        this.fb.group({
          windSpeed: ['', Validators.required],
          windDirection: ['', Validators.required],
          waterState: ['', Validators.required],
        })
      ])
    });
    this.usageForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages no
  }

  checkDateRange(c: AbstractControl) {
    return c.get('startTime').value < c.get('endTime').value ? null : { notInRange: true }
  }

  private createArrayCrew(): FormGroup {
    return this.fb.group({
      name: ['', null]
    });
  }

  private addArrayCrew(): void {
    var crew = this.usageForm.get('formArray').get([2]).get('notableCrew') as FormArray;
    crew.push(this.createArrayCrew());
  }

  private removeCrew(i: number): void {
    if (i === undefined) return;
    var crew = this.usageForm.get('formArray').get([2]).get('notableCrew') as FormArray;
    crew.removeAt(i);
  }

  get formCrewArray() { return <FormArray>this.usageForm.get('formArray').get([2]).get('notableCrew'); }

  /** Update error messages due to validation */
  private onValueChanged(data?: any) {
    if (!this.usageForm) { return; }
    const form = this.usageForm;

    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = this.findFieldControl(form, field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  /**
  * Given a form (assuming formArray) and a field loop through the formArray to
  * find the control that belongs with the field.
  */
  private findFieldControl(form, field) {
    for (var i = 0; i < 4; i++) {
      let control = form.get('formArray').get([i]).get(field)
      if (control) return control;
    }
  }

  /** Build BreakageInfo Object from submited data */
  public onSubmit() {
    if (this.usageForm.valid) {

      let crew = this.usageForm.get('formArray').get([2]).get('notableCrew').value;

      const usage = new UsageInfo(
        BoatNameConversionHelper.numberFromUserFriendlyName(this.usageForm.get('formArray').get([0]).get('boatID').value),
        this.buildTimeDate(this.usageForm.get('formArray').get([1]).get('date').value, this.usageForm.get('formArray').get([1]).get('startTime').value),
        this.buildTimeDate(this.usageForm.get('formArray').get([1]).get('date').value, this.usageForm.get('formArray').get([1]).get('endTime').value),
        null,
        this.usageForm.get('formArray').get([2]).get('driver').value,
        crew,
        WindSpeedConversionHelper.numberFromUserFriendlyName(this.usageForm.get('formArray').get([3]).get('windSpeed').value),
        WindDirectionConversionHelper.numberFromUserFriendlyName(this.usageForm.get('formArray').get([3]).get('windDirection').value),
        WaterStateConversionHelper.numberFromUserFriendlyName(this.usageForm.get('formArray').get([3]).get('waterState').value)
      )

      this.usageService.addUsageInfo(usage).then(
        () => (
          this.snackBar.open('Usage Succesfully Submited', 'Close', {
            duration: 2000,
          }),
          this.createForm(),
          this.stepper.selectedIndex = 0
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

  getStartTime() {
    console.log(this.usageForm.get('formArray').get([1]).get("startTime"))
  }

  /**
  * Given a time and a date combine them together
  **/
  private buildTimeDate(date: Date, timeString: string) {
    console.log(timeString);
    var time = timeString.split(":");
    var hour = parseInt(time[0]);
    var minute = parseInt(time[1]);
    let timeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
    console.log(timeDate)
    return timeDate;
  }
}
