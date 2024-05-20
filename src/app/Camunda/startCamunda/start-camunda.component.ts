import { AfterViewInit, Component } from '@angular/core';
import { CamundaService } from '../../services/camundaConnect';
import { GlobalService } from '../../global.service';


@Component({
  selector: 'app-start-camunda',
  templateUrl: './start-camunda.component.html'
})
export class StartCamundaComponent implements AfterViewInit {

  showFrameComponent:boolean=false;

  constructor(private camundaService: CamundaService,private globalService:GlobalService) { }

  ngAfterViewInit(){
    this.startProcess();
  }

  startProcess():void{
    this.camundaService.startProcess()
      .subscribe(
        response => {
          this.globalService.setGlobalVariable(response.id)
          console.log("Process started successfuly:",response)
          this.showFrameComponent=true;
        },
        error => {
          console.log("Failed to start process:",error)
        }
      )
  }
}
