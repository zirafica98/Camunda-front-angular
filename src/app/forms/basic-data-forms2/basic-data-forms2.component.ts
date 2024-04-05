import { Component } from '@angular/core';
import { CamundaService } from '../../service/camundaConnect';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { FrameComponent } from '../Frame/frame.component';

@Component({
  selector: 'app-basic-data-forms2',
  templateUrl: './basic-data-forms2.component.html',
  styleUrl: './basic-data-forms2.component.scss'
})
export class BasicDataForms2Component {


  constructor(private camundaService: CamundaService,private globalSerive:GlobalService, private router:Router,private frameComponet:FrameComponent) { }

  isChecked:boolean=false;
  isChecked2:boolean=false;

  submitForm() {
    this.camundaService.completeTask()
    .subscribe(
      response => {
        this.router.navigate(['/frame']).then(()=>{
          this.frameComponet.toggleComponent();
        });
      }
    )
  }
}
