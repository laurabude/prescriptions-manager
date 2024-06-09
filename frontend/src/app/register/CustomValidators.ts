import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static isNullOrEmpty(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value == null || value.trim().length === 0) {
        return { isNullOrEmpty: true };
      }
      return null;
    };
  }
}
