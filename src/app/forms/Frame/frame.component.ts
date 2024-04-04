import { Component,OnInit  } from '@angular/core';
import { GlobalService } from '../../global.service';
import { CamundaService } from '../../service/camundaConnect';
import {Router } from '@angular/router';
@Component({
  selector: 'frame-component',
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent {
  showJmbgForms:boolean = false;
  showCodeBookForm:boolean = false;
  constructor(private globalService:GlobalService, private camundaService:CamundaService,private router:Router) { }

  ngOnInit(){
    this.toggleComponent();
  }

  toggleComponent(){
    this.camundaService.getActiveTask()
      .subscribe(
        response => {
          console.log(response);
          this.globalService.setGlobalTaskKey(response[0].formKey);
          this.globalService.setGlobalTaskId(response[0].id);
          this.router.navigate([`/frame/${response[0].formKey}`,response[0].formKey]);
        }
      )
  }
}
