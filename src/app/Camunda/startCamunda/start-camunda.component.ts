import { Component} from '@angular/core';
import { CamundaService } from '../../service/camundaConnect';
import { GlobalService } from '../../global.service';


@Component({
  selector: 'app-start-camunda',
  templateUrl: './start-camunda.component.html',
  styleUrls: ['./start-camunda.component.css']
})
export class StartCamundaComponent {
  //processDefinitionKey: string = 'Process_18c7yk0';
  tasks: any[] = [];
  currentUser: string = "";
  variables : any = {

  }

  showFrameComponent:boolean=false;

  constructor(private camundaService: CamundaService,private globalService:GlobalService) { }


  // createProcessIfNeeded():void{
  //     this.startProcess();
  //     this.processService.markProcessCreated();
  // }


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
  
  

  // generateRandomUsername(): string {
  //   const adjectives = ['Happy', 'Sunny', 'Funny', 'Lucky', 'Clever', 'Brave', 'Gentle', 'Kind', 'Smart', 'Wise'];
  //   const nouns = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Tiger', 'Elephant', 'Lion', 'Wolf', 'Bear', 'Monkey'];
  
  //   const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
  //   const randomNounIndex = Math.floor(Math.random() * nouns.length);
  
  //   const adjective = adjectives[randomAdjectiveIndex];
  //   const noun = nouns[randomNounIndex];
  
  //   const randomNumber = Math.floor(Math.random() * 1000);
  //   this.currentUser = `${adjective}${noun}${randomNumber}`
  //   this.globalService.setGloablUserName(`${adjective}${noun}${randomNumber}`)
  //   return `${adjective}${noun}${randomNumber}`;
  // }
}
