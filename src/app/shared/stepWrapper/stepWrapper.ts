import { Component} from '@angular/core';
import stepsData from './steps.json';

@Component({
  selector: 'app-steps-wrap',
  templateUrl: './stepWrapper.html',
  styleUrls: ['./stepWrapper.css']
})
export class StepsWrapComponent{
    steps: any[] = [];
  
    constructor() { }
  
    ngOnInit(): void {
      this.steps = stepsData;
    }
  }
