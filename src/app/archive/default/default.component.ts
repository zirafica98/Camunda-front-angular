import { Component } from '@angular/core';
import { CamundaService } from '../../service/camundaConnect';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { FrameComponent } from '../../forms/Frame/frame.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl:'../../forms/style/forms-style.css'
})
export class DefaultComponent {

  
  constructor() { }

}
