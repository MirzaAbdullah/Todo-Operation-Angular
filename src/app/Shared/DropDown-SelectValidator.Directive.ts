import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector : '[ddlSelectValidator]',
    providers: [{
        provide : NG_VALIDATORS,
        useExisting : DropDown_SelectValidatorDirective,
        multi : true
    }]
})

export class DropDown_SelectValidatorDirective implements Validator {
    validate(control : AbstractControl) : { [key:string]:any } | null {
        return control.value === '-1' ? { 'defaultSelected' : true } : null;
    }
}