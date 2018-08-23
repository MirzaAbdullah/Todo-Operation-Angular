import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector : '[ConfirmPasswordValidator]',
    providers: [{
        provide : NG_VALIDATORS,
        useExisting : ConfirmPasswordValidatorDirective,
        multi : true
    }]
})

/* For Group */

export class ConfirmPasswordValidatorDirective implements Validator {
    validate(passwordGroup : AbstractControl) : { [key:string]:any } | null {
        const passwordField = passwordGroup.get('Password');
        const confirmPasswordField = passwordGroup.get('ConfPassword');
        if (passwordField && confirmPasswordField && passwordField.value !== confirmPasswordField.value) {
            return { 'notEqual': true };
        }
        return null;
    }
}

/*  For Single Field

export class ConfirmPasswordValidatorDirective implements Validator {
    @Input() ConfirmPasswordValidator: string;
    validate(control : AbstractControl) : { [key:string]:any } | null {
        const controlToCompare = control.parent.get(this.ConfirmPasswordValidator);
        if(control.value !== "" || control.value !== undefined)
        {
            if (controlToCompare && controlToCompare.value !== control.value) {
                return { 'notEqual': true };
            }
        }
        return null;
    }
}

*/