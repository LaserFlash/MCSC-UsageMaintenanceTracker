import { Validators, FormControl, FormArray } from '@angular/forms';
interface ValidationResult {
  [key: string]: boolean;
}

export class CheckBoxValidator {
  static multipleCheckboxRequireOne(fa: FormArray) {
    let valid = false;
    for (let x = 0; x < fa.length; ++x) {
      if (fa.at(x).value) {
        valid = true;
        break;
      }
    }
    return valid ? null : {
      multipleCheckboxRequireOne: true
    };
  }
}

export class ContactValidator {

  static emailAndMobile(c: FormControl): ValidationResult {
    const emailRegex = /.+@.+\..+/i;
    const mobileRegex = /^[0-9]{9,12}$/;
    const v = c.value;

    if (emailRegex.test(v)) {
      return null;
    }
    if (mobileRegex.test(v)) {
      return null;
    }
    if (v === '') {
      return null;
    }
    return { 'notEmailmobile': true };
  }

}
