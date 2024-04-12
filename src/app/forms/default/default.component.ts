import { Component } from '@angular/core';
import { CamundaService } from '../../service/camundaConnect';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { FrameComponent } from '../Frame/frame.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl:'../style/forms-style.css'
})
export class DefaultComponent {

  
  constructor(private camundaService: CamundaService,private globalSerive:GlobalService, private router:Router,private frameComponet:FrameComponent) { }

  submitForm() {
        window.location.reload();
      }
}
