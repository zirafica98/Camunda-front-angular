import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { checkboxResources } from '../../resources';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrl: './checkbox-input.component.scss'
})
export class CheckboxInputComponent implements OnInit{  
@Input() isChecked: boolean = false; 
@Input() mandatory: boolean = false; 
@Input() key: string = ""; 
link: string = ""; 
text:string="";
@Output() isCheckedChange = new EventEmitter<boolean>(); // Event emitter za promenu stanja checkboxa

ngOnInit(): void {
  this.text=checkboxResources[this.key].text;
  this.link=checkboxResources[this.key].link;
}
toggleCheckbox() {
  this.isChecked = !this.isChecked;
  this.isCheckedChange.emit(this.isChecked);
}
}
