import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ContactValidator } from '../../shared/validators/CustomValidators';
import { BreakageInfo } from '../../../core/objects/breakageInfo';
import { BoatBreakageService } from '../../shared/providers/boat-breakage.service';
import { KnownBoatsService } from '../../../core/constants/known-boats/known-boats.service';

import { BoatID } from '../../../core/objects/boat';
import { Levels, Parts420 } from '../../../core/constants/menu-names/menuNames';
import { ImportanceConversionHelper } from '../../../core/constants/menu-names/nameConversion';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { MatRadioChange } from '@angular/material/radio';

import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';


@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})

export class ReportIssueComponent implements OnInit {
  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  isLinear = true;
  imageLoaded = true;
  imageID = '';

  levels = Levels;
  parts = Parts420;

  breakageForm: FormGroup;
  breakage: BreakageInfo[] = [];

  title = 'Report Boat Breakage';
  boats: BoatID[];

  breakages: BreakageInfo[];
  loadingBreakages = true;

  uploader: FileUploader;

  formErrors = {
    'name': '',
    'contact': '',
    'boatType': '',
    'boatID': '',
    'importance': '',
    'part': '',
    'details': ''
  };

  validationMessages = {
    'name': {
      'required': 'Your name is required'
    },
    'contact': {
      'notEmailmobile': 'Contact must be email or mobile'
    },
    'boatID': {
      'required': 'Boat name is required'
    },
    'importance': {
      'required': 'Category is required'
    },
    'part': {
      'required': 'Category is required'
    },
    'details': {
      'required': 'Breakage details are required',
      'maxlength': 'Maximum number of characters is 256'
    }
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private breakageService: BoatBreakageService,
    private BOATS: KnownBoatsService,
    private cloudinary: Cloudinary,
  ) {}


  ngOnInit() {
    this.BOATS.boatInformation.subscribe( boats => {
      this.boats = boats.filter(boat => {
        return boat.selectable;
      });
    });

    this.breakages = this.breakageService.recentItems;

    this.createForm();

    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    this.uploader = new FileUploader(uploaderOptions);

    // Add custom tag for displaying the uploaded photo in the list
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      let tags = 'myphotoalbum';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `myphotoalbum,${this.title}`;
      }
      form.append('tags', tags);
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return { fileItem, form };
    };
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
       this.imageLoaded = true;
       const j = JSON.parse(response);
       this.imageID = j['public_id'];
       this.breakage[0].imageID = this.imageID;
      };
    this.uploader.onProgressItem = (fileItem: any, progress: any) => { this.imageLoaded = false; };
  }

  /** Build the form */
  private createForm() {
    this.imageID = '';
    this.imageLoaded = true;

    this.breakageForm = this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          contact: ['', ContactValidator.emailAndMobile],
        }),
        this.fb.group({
          boatID: ['', Validators.required],
          importance: ['', Validators.required],
          part: ['', Validators.required],
          details: ['', [Validators.required, Validators.maxLength(256)]]
        }),
      ])
    });

    /* Setup default boat type selection */
    this.breakageForm.get('formArray').get([1]).patchValue({
      boatType: 'RiB'
    });

    this.breakageForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  /** Update error messages due to validation */
  private onValueChanged(data?: any) {
    this.breakage[0] = new BreakageInfo(
      this.breakageForm.get('formArray').get([0]).get('name').value,
      this.breakageForm.get('formArray').get([0]).get('contact').value,
      this.breakageForm.get('formArray').get([1]).get('boatID').value,
      ImportanceConversionHelper.numberFromImportance(this.breakageForm.get('formArray').get([1]).get('importance').value),
      this.breakageForm.get('formArray').get([1]).get('part').value,
      this.breakageForm.get('formArray').get([1]).get('details').value,
      null,
      new Date(),
      null,
      this.imageID
    );

    if (!this.breakageForm) { return; }
    const form = this.breakageForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get('formArray').get([0]).get(field) ? form.get('formArray').get([0]).get(field) :
        form.get('formArray').get([1]).get(field);

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
    if (this.breakageForm.valid) {
      const breakage = new BreakageInfo(
        this.breakageForm.get('formArray').get([0]).get('name').value,
        this.breakageForm.get('formArray').get([0]).get('contact').value,
        this.breakageForm.get('formArray').get([1]).get('boatID').value,
        ImportanceConversionHelper.numberFromImportance(this.breakageForm.get('formArray').get([1]).get('importance').value),
        this.breakageForm.get('formArray').get([1]).get('part').value,
        this.breakageForm.get('formArray').get([1]).get('details').value,
        null,
        new Date(),
        null,
        this.imageID
      );
      /* Confirm submission of data */
      this.breakageService.addBreakageInfo(breakage).then(
        () => (
          this.snackBar.open('Breakage Succesfully Submited', 'Close', {
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


  /**
  * Display items only for boats of the given type
  * A boat is relevant if it belongs to the previously selected type
  **/
  relevantItemsFromType(boat: BoatID): boolean {
    return boat.type1 && this.breakageForm.get('formArray').get([1]).value.boatType === 'RiB' ||
      !boat.type1 && this.breakageForm.get('formArray').get([1]).value.boatType === '420';
  }
}
