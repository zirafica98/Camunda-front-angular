import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { selectResources } from '../../resources';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrl: '../style/component-style.css',
})
export class CustomSelectComponent implements OnInit{

  @Input() options:string[]=[];
  @Input() key: string = "";
  placeholder: string = "";
  tooltip: string = "";
  @Output() formValidityChange = new EventEmitter<boolean>();
  @Output() valueChange = new EventEmitter<string>();

  form=new FormGroup({
    input : new FormControl('', [Validators.required])
    })

  get input(){return this.form.get('input')}

  selectResources=selectResources;

  constructor() {

    this.form.statusChanges.subscribe(status => {
      this.formValidityChange.emit(status === 'VALID');
    });
    
    this.form.get('input')?.valueChanges.subscribe(value => {
      this.valueChange.emit(value||"");
    });
  }

  ngOnInit() {
    if(this.options.length==0)
      this.options=selectResources[this.key].options;
    if (this.key === "addressDiff" && this.options.length > 1) 
      this.form.get('input')?.setValue(this.options[1]);
    else
      this.form.get('input')?.setValue(null);
  
    this.placeholder=selectResources[this.key].placeholder;
    this.tooltip=selectResources[this.key].tooltip;
    this.form.get('input')?.updateValueAndValidity();
  }

  isValid():boolean{
    const inputControl = this.form.get('input');
    return (inputControl?.invalid && inputControl?.touched)||false;
  }

}