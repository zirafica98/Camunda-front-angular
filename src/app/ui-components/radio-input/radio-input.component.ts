import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { radioResources } from '../../resources';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrl: '../style/component-style.css'
})
export class RadioInputComponent  implements OnInit{

  @Input() key: string = "";
  options: string[] = [];
  value:number=0;
  @Output() valueChange = new EventEmitter<number>();

  form=new FormGroup({
    input : new FormControl(0, [])
    })

  get input(){return this.form.get('input')}

  radioResources=radioResources;

  constructor() {
    this.form.get('input')?.valueChanges.subscribe(value => {
      this.valueChange.emit(value||0);
    });
  }

  ngOnInit() {
    this.options=radioResources[this.key].options;
    this.form.get('input')?.updateValueAndValidity();
  }

  isValid():boolean{
    return true;
  }

  onRadioChange(event: Event) {
        this.value=this.form.get('input')?.value||0;
  }

}