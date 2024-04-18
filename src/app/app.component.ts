import { AfterViewInit, Component,OnInit, ViewChild  } from '@angular/core';
import { GlobalService } from './global.service';
import { StartCamundaComponent } from './Camunda/startCamunda/start-camunda.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  @ViewChild(StartCamundaComponent) startCamundaComponent!: StartCamundaComponent;
  title = 'camunda-front';
  constructor() { }
  ngAfterViewInit(): void {
    this.startCamundaComponent.startProcess();
  }
}
