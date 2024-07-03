import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrl: '../style/component-style.css',
})
export class FormButtonComponent {
  @Input() text: string = "";

}
