import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: '../style/component-style.css',
})
export class DocumentComponent {
  @Input() key: string = "";
}
