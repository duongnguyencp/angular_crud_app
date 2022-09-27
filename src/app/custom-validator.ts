import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidator {
   static patternValidator(regex: RegExp, error: ValidationErrors):ValidatorFn{
        return (control:AbstractControl):{ [key:string]:any } => {
            if(!control.value){
                return {};
            }
            const valid = regex.test(control.value);
            return valid ? {} :error;
        };
   }
   static passwordMatchValidator(control: FormGroup): { [key:string]:any }  {
      if(!control.value){
        return {};
      }
      const password: string = control.root.get('password')?.value;
      const confirmPassword: string = control.value;
      if(password != confirmPassword){
       
        return {NoPasswordMatch:true}
      }
      else return {};
   }
}
