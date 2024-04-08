import { Component, OnInit,Inject } from '@angular/core';
import { CamundaService } from '../../service/camundaConnect';
import { GlobalService } from '../../global.service';
import { ProcessService } from "../../process.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-start-camunda',
  templateUrl: './start-camunda.component.html',
  styleUrls: ['./start-camunda.component.css']
})
export class StartCamundaComponent implements OnInit {
  //processDefinitionKey: string = 'Process_18c7yk0';
  showFrameComponent:boolean = false;
  tasks: any[] = [];
  currentUser: string = "";
  variables : any = {

  }
  constructor(private camundaService: CamundaService,private globalService:GlobalService, private processService:ProcessService, @Inject(Router) private router: Router) { }

  ngOnInit(): void {
    this.createProcessIfNeeded();
  }

  createProcessIfNeeded():void{
      this.startProcess();
      this.processService.markProcessCreated();
  }


  startProcess():void{
    if(this.globalService.isDev()){
    this.camundaService.startProcess()
      .subscribe(
        response => {
          this.globalService.setGlobalVariable(response.id)
          console.log("Process started successfuly:",response)
          this.showFrameComponent = true;
        },
        error => {
          console.log("Failed to start process:",error)
        }
      )}
      else{this.showFrameComponent = true;}
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
