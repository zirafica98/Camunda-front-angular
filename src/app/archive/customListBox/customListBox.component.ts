import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-box',
  templateUrl: './customListbox.component.html',
  styleUrl:'../../components/style/component-style.css'
})
export class ListBoxComponent {
  @Input() items!: any[];
  @Input() label!: string;
  @Input() placeholder!: string;
}
