import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { StartCamundaComponent } from '../../Camunda/startCamunda/start-camunda.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements AfterViewInit{

  @ViewChild(StartCamundaComponent) startCamundaComponent!: StartCamundaComponent;

  ngAfterViewInit(): void {
    this.startCamundaComponent.startProcess();
  }
}
