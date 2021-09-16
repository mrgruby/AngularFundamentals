import { Directive } from '@angular/core';
import { FormGroup, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appLocationValidator]',
  //For this directive to work as a validator, it must be added to angulars list of validators i.e. NG_VALIDATORS. multi:true means that it is added to the existing list.
  providers: [{provide: NG_VALIDATORS, useExisting:LocationValidatorDirective, multi:true}]
})
export class LocationValidatorDirective implements Validator {

  constructor() { }

  validate(formGroup: FormGroup) : {[key: string] : any} {
    let addressControl = formGroup.controls['address'];
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

    if((addressControl && addressControl.value
      && cityControl && cityControl.value
      && countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)) {
        return null; //The validation passed
      }
      else{
        return {validateLocation: false}
      }
  }
}
