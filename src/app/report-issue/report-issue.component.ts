import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent implements OnInit {
  title = "Report Boat Breakage";
  boats = [
    '1', '2', '3', '4', 'RIB'
  ];
  levels = [
    'Urgent (boat out of action)',
    'High (boat usable if needed)',
    'Medium (boat usable)',
    'Low (breakage does not yet affect use)'
  ];

  ngOnInit() {
  }

  constructor(
    private fb: FormBuilder,
    public snackBar: MdSnackBar
  ) {
    this.createForm();
  }

  breakageForm: FormGroup;
  createForm() {
    this.breakageForm = this.fb.group({
      name: ['', Validators.required],
      contact: [''],
      boatID: ['', Validators.required],
      importance: ['', Validators.required],
      details: ['', Validators.required]
    });
    this.breakageForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.breakageForm) { return; }
    const form = this.breakageForm;

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
    'name': '',
    'contact':'',
    'boatID': '',
    'importance': '',
    'details': ''
  };

  validationMessages = {
    'name': {
      'required': 'Your name is required.'
    },
    'contact': {
      'pattern': 'Contact must be email or mobile'
    },
    'boatID': {
      'required': 'Boat number is required'
    },
    'importance': {
      'required': 'Category is required'
    },
    'details': {
      'required': 'Breakage details are requiredrequired'
    }
  };



}
