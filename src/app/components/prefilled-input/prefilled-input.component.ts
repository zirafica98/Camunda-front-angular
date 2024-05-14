import { Component, Input } from '@angular/core';
import { inputResource } from '../../resources';

@Component({
  selector: 'app-prefilled-input',
  templateUrl: './prefilled-input.component.html',
  styleUrl: '../style/component-style.css',
})
export class PrefilledInputComponent {
  
  @Input() customType: string = "";
  @Input() value: string = "";

  inputResource=inputResource;

  constructor() {}

}