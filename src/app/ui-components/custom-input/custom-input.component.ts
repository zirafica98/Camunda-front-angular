import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { inputResource } from '../../resources';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrl: '../style/component-style.css',
})
export class CustomInputComponent implements OnInit{
  
  @Input() key: string = "";
  @Input() mandatory: boolean = true;
  tooltip: string = "";
  @Input() prefilledValue: string = "";

  @Output() formValidityChange = new EventEmitter<boolean>();

  inputResource=inputResource;

  form=new FormGroup({
  input : new FormControl('', [])
  })

  get input(){return this.form.get('input')}

  constructor() {

    this.form.statusChanges.subscribe(status => {
      this.formValidityChange.emit(status === 'VALID');
    });
  }

  ngOnInit() {
    if(this.prefilledValue!="")
      this.form.get('input')?.setValue(this.prefilledValue);
    this.form.get('input')?.setValidators(customValidator(this.key));
    if(this.mandatory) this.form.get('input')?.addValidators(Validators.required);
    this.form.get('input')?.updateValueAndValidity();
    this.tooltip=inputResource[this.key].tooltip;
  }


  isValid():boolean{
    const inputControl = this.form.get('input');
    return (inputControl?.invalid && inputControl?.touched)||false;
  }

}

function customValidator(key: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    let isValid=true;
    switch (key) {
      case 'ssn':
        isValid = SSNValidator(value);break;
      case 'phone':
         isValid = /^[0-9]{7,8}$/.test(value);break;
      case 'name': case 'lastname':
         isValid = /^[a-zA-ZčćžđšČĆŽĐŠ\s]{2,}$/.test(value);break;
      case 'email':
        isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);break;
      case 'verification':
        isValid = /^[0-9]{6,6}$/.test(value);break;
    }
    return isValid ? null : { customError: true };
  };
}

function SSNValidator(value:string){
  if (value.length !== 13) {
    return false;
  }

  if (!/^\d+$/.test(value)) {
    return false;
  }

  const year = parseInt(value.substring(4, 3), 10);
  const month = parseInt(value.substring(2, 2), 10) - 1;
  const day = parseInt(value.substring(0, 2), 10);
  const birthday = new Date(year, month, day);
  const today = new Date();
  const minDate = new Date(1800, 0, 1); 
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  
  if (birthday < minDate || birthday > maxDate) {
    return false;
  }

  const weights = [7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(value.charAt(i), 10) * weights[i];
  }
  const remainder = sum % 11;
  const controlNumber = remainder === 0 ? 0 : 11 - remainder;
  if (controlNumber !== parseInt(value.charAt(12), 10)) {
    return false;
  }

  return true;
}