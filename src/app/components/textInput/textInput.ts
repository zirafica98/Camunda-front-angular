import { Component, Input } from '@angular/core';

@Component({
  selector: 'text-input',
  templateUrl: './textInput.html',
})
export class TextInputComponent {
    @Input() label!: string;
    @Input() placeholder!: string;
}
