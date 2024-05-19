import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inputResource } from '../../resources';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrl: '../style/component-style.css',
})
export class CustomSelectComponent implements OnInit{

  @Input() options:string[]=[];
  @Input() customType: string = "";
  @Input() placeholder: string = "";
  @Input() tooltip: string = "";
  @Output() formValidityChange = new EventEmitter<boolean>();

  form=new FormGroup({
    input : new FormControl('', [Validators.required])
    })

  get input(){return this.form.get('input')}

  inputResource=inputResource;

  constructor() {

    this.form.statusChanges.subscribe(status => {
      this.formValidityChange.emit(status === 'VALID');
    });
  }

  ngOnInit() {
    if (this.customType === "addressDiff" && this.options.length > 1) 
      this.form.get('input')?.setValue(this.options[1]);
    else
      this.form.get('input')?.setValue(null);
  
    this.form.get('input')?.updateValueAndValidity();
  }

  isValid():boolean{
    const inputControl = this.form.get('input');
    return (inputControl?.invalid && inputControl?.touched)||false;
  }

}