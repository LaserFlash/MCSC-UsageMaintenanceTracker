import { Validators, FormControl } from '@angular/forms';
interface ValidationResult {
 [key:string]:boolean;
}

export class ContactValidator {

 static emailAndMobile(c: FormControl): ValidationResult {
   var emailRegex =  /.+@.+\..+/i;
   var mobileRegex = /^[0-9]{9,12}$/;
   var v = c.value;

   if(emailRegex.test(v)){
     return null;
   }
   if(mobileRegex.test(v)){
     return null;
   }
   if(v == ''){
     return null;
   }
   return {"notEmailmobile":true};
 }

}
