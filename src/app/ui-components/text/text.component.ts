import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrl: '../style/component-style.css',
})
export class TextComponent {

  @Input() text: string = "";
  @Input() className: string = "";

}
