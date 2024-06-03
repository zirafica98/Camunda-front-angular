import { Component, Input, OnInit } from '@angular/core';
import { inputResource } from '../../resources';

@Component({
  selector: 'app-prefilled-input',
  templateUrl: './prefilled-input.component.html',
  styleUrl: '../style/component-style.css',
})
export class PrefilledInputComponent implements OnInit{
  
  @Input() key: string = "";
  @Input() value: string = "";
  tooltip: string = "";

  inputResource=inputResource;

  constructor() {}

  ngOnInit(): void {
    this.tooltip=inputResource[this.key].tooltip;
  }

}