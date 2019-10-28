import { Component, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

import { WindTypes, WindDirection, WaterState } from '../../../core/constants/menu-names/menuNames';
import { WindSpeedConversionHelper, WindDirectionConversionHelper, WaterStateConversionHelper } from '../../../core/constants/menu-names/nameConversion';
import { BoatUsageService } from '../../shared/providers/boat-usage.service';
import { KnownBoatsService } from '../../../core/constants/known-boats/known-boats.service';
import { UsageInfo } from '../../../core/objects/usageInfo';
import { BoatID } from '../../../core/objects/boat';

const NUMBER_REGEX = /[0-9]+/;

@Component({
  selector: 'app-report-usage',
  templateUrl: './report-usage.component.html',
  styleUrls: ['./report-usage.component.css']
})
export class ReportUsageComponent {

  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  title = 'Report Boat Usage';
  maxDate = new Date();
  boats: BoatID[];

  isLinear = true;

  windSpeed = WindTypes;
  windDirection = WindDirection;
  waterState = WaterState;

  public usageForm: FormGroup;

  formErrors = {
    'boatID': '',
    'startTime': '',
    'endTime': '',
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
    public snackBar: MatSnackBar,
    private BOATS: KnownBoatsService
    ) {
      this.dateAdapter.setLocale('en-nz');
      this.createForm();
      BOATS.boatInformation.subscribe((boats) => {
        this.boats = boats.filter((boat) => {
          return boat.selectable;
        });
      });
    }

  /** Build the form */
  private createForm() {
    this.usageForm = this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          boatType: ['', Validators.required],
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
    /* Setup default boat type selection */
    this.usageForm.get('formArray').get([0]).patchValue({
      boatType: 'RiB'
    });

    /* Manage value changes */
    this.usageForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  checkDateRange(c: AbstractControl) {
    return c.get('startTime').value < c.get('endTime').value ? null : { notInRange: true };
  }

  private createArrayCrew(): FormGroup {
    return this.fb.group({
      name: ['', null]
    });
  }

  private addArrayCrew(): void {
    const crew = this.usageForm.get('formArray').get([2]).get('notableCrew') as FormArray;
    crew.push(this.createArrayCrew());
  }

  private removeCrew(i: number): void {
    if (i === undefined) { return; }
    const crew = this.usageForm.get('formArray').get([2]).get('notableCrew') as FormArray;
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
    for (let i = 0; i < 4; i++) {
      const control = form.get('formArray').get([i]).get(field);
      if (control) { return control; }
    }
  }

  /** Build BreakageInfo Object from submited data */
  public onSubmit() {
    if (this.usageForm.valid) {

      const crew = this.usageForm.get('formArray').get([2]).get('notableCrew').value;

      const usage = new UsageInfo(
        this.usageForm.get('formArray').get([0]).get('boatID').value,
        this.buildTimeDate(this.usageForm.get('formArray').get([1]).get('date').value.toDate(), this.usageForm.get('formArray').get([1]).get('startTime').value),
        this.buildTimeDate(this.usageForm.get('formArray').get([1]).get('date').value.toDate(), this.usageForm.get('formArray').get([1]).get('endTime').value),
        null,
        this.usageForm.get('formArray').get([2]).get('driver').value,
        crew,
        WindSpeedConversionHelper.numberFromUserFriendlyName(this.usageForm.get('formArray').get([3]).get('windSpeed').value),
        WindDirectionConversionHelper.numberFromUserFriendlyName(this.usageForm.get('formArray').get([3]).get('windDirection').value),
        WaterStateConversionHelper.numberFromUserFriendlyName(this.usageForm.get('formArray').get([3]).get('waterState').value)
      );

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
    console.log(this.usageForm.get('formArray').get([1]).get('startTime'));
  }

  /**
  * Given a time and a date combine them together
  **/
  private buildTimeDate(date: Date, timeString: string) {
    const time = timeString.split(':');
    const hour = parseInt(time[0]);
    const minute = parseInt(time[1]);
    const timeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
    return timeDate;
  }
}
