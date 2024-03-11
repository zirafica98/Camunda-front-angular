import { Component, OnInit } from '@angular/core';
import { CamundaService } from '../../service/camundaConnect';
import { GlobalService } from '../../global.service';
import { ProcessService } from "../../process.service";



@Component({
  selector: 'app-start-camunda',
  templateUrl: './start-camunda.component.html',
  styleUrls: ['./start-camunda.component.css']
})
export class StartCamundaComponent implements OnInit {
  processDefinitionKey: string = 'Process_18c7yk0';
  tasks: any[] = [];
  currentUser: string = "";
  variables : any = {

  }
  constructor(private camundaService: CamundaService,private globalService:GlobalService, private processService:ProcessService) { }

  ngOnInit(): void {
    this.createProcessIfNeeded();
  }

  createProcessIfNeeded():void{
    if(!this.processService.isProcessCreated()){
      this.startProcess();
      this.processService.markProcessCreated();
      this.generateRandomUsername();
      this.getTaskId();
    }
  }


  startProcess():void{
    this.camundaService.startProcess(this.processDefinitionKey,this.variables)
      .subscribe(
        response => {
          this.globalService.setGlobalVariable(response.id)
          console.log("Process started successfuly:",response)
        },
        error => {
          console.log("Failed to start process:",error)
        }
      )
  }
  getTaskId():void{
    setTimeout(()=>{
      this.camundaService.getTasks(this.globalService.getGlobalVariable())
      .subscribe(
        response => {
          //this.tasks = response.map(task => ({...task,assignedUser:this.currentUser}));
          this.globalService.setGlobalTaskId(response);
        },
        error =>{
          console.log("Error catch tasks id",error)
        }
      )
    },2000)
    
  }

  generateRandomUsername(): string {
    const adjectives = ['Happy', 'Sunny', 'Funny', 'Lucky', 'Clever', 'Brave', 'Gentle', 'Kind', 'Smart', 'Wise'];
    const nouns = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Tiger', 'Elephant', 'Lion', 'Wolf', 'Bear', 'Monkey'];
  
    const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
    const randomNounIndex = Math.floor(Math.random() * nouns.length);
  
    const adjective = adjectives[randomAdjectiveIndex];
    const noun = nouns[randomNounIndex];
  
    const randomNumber = Math.floor(Math.random() * 1000);
    this.currentUser = `${adjective}${noun}${randomNumber}`
    this.globalService.setGloablUserName(`${adjective}${noun}${randomNumber}`)
    return `${adjective}${noun}${randomNumber}`;
  }
}
