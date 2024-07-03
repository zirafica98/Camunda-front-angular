import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: '../style/component-style.css'
})
export class ImageComponent {
  @Input() src: string = "";
  @Input() className: string = "";
}
