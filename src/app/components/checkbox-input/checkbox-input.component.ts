import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrl: './checkbox-input.component.scss'
})
export class CheckboxInputComponent {  
@Input() isChecked: boolean = false; 
@Input() customText:string="";
@Output() isCheckedChange = new EventEmitter<boolean>(); // Event emitter za promenu stanja checkboxa

toggleCheckbox() {
  this.isChecked = !this.isChecked;
  this.isCheckedChange.emit(this.isChecked);
}
}
