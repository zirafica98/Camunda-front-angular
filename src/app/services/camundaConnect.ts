import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})

export class CamundaService {

  private baseUrl: string = 'https://localhost:44386'; 
  private processName: string = 'demoDiagram'

  constructor(private http: HttpClient,private globalService:GlobalService){}

  startProcess():Observable<any>{
    var variables = {
      processName:this.processName
    }
    const url = `${this.baseUrl}/api/Camunda/startProcessInstance/${this.processName}`;
    return this.http.post(url,{variables})
  }

  getProcessDefinition(): Observable<any> {
    const url = `${this.baseUrl}/api/Camunda/getProcessDefinition/${this.processName}`;
    return this.http.get(url);
  }

  getProcessDefinitionXML(): Observable<any> {
    const url = `${this.baseUrl}/api/Camunda/getProcessDefinitionXML/${this.processName}`;
    return this.http.get(url);
  }

  getProcessInstance(): Observable<any>{
    const url = `${this.baseUrl}/api/Camunda/getProcessInstance/${this.globalService.getGlobalVariable()}`;
    return this.http.get(url);
  }

  getActiveTask(): Observable<any>{
    const url = `${this.baseUrl}/api/Camunda/getActiveTask/${this.globalService.getGlobalVariable()}`;
    return this.http.get(url);
  }
  
  completeTask():Observable<any>{
    var variables = {
      taskId:this.globalService.getGlobalTaskId()
    }
    const url = `${this.baseUrl}/api/Camunda/completeActiveTask/${this.globalService.getGlobalTaskId()}`;
    return this.http.post(url,{variables})
  }

}
