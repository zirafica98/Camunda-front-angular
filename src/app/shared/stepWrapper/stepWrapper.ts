import { Component} from '@angular/core';
import stepsData from './steps.json';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-steps-wrap',
  templateUrl: './stepWrapper.html',
  styleUrls: ['./stepWrapper.css']
})
export class StepsWrapComponent{
    steps: any[] = [];
    subtitle:string="";

    constructor(private globalService:GlobalService) { }
  
    ngOnInit(): void {
      this.steps = stepsData;
      this.globalService.subtitle$.subscribe(value=>{
        this.subtitle=value;
      });
    }
  }
