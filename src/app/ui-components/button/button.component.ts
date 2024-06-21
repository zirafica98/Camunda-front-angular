import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: '../style/component-style.css',
})
export class ButtonComponent {
  @Input() text: string = "";

}
