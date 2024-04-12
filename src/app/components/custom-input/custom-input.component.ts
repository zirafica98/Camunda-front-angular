import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrl: '../style/component-style.css',
})
export class CustomInputComponent {

  form=new FormGroup({
  input : new FormControl('', [Validators.required, customValidator])
  })

  get input(){return this.form.get('input')}

  constructor() {

    this.form.statusChanges.subscribe(status => {
      this.formValidityChange.emit(status === 'VALID');
    });
  }
  
  @Input() customText: string = "";
  @Input() customPlaceholder: string = "";
  @Input() customError: string = "";

  @Output() formValidityChange = new EventEmitter<boolean>();


  isValid():boolean{
    return (this.form.get('input')?.hasError('customError') && this.form.get('input')?.touched) || false;
  }
}

function customValidator(control: AbstractControl) {
  const value = control.value; 

  if (value !== '000') {
    return { customError: true }; 
  }
  
  return null;
}