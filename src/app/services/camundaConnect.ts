import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})

export class CamundaService {

  private baseUrl: string = 'http://localhost:8081'; 
  private processName: string = 'demoDiagram'

  constructor(private http: HttpClient,private globalService:GlobalService){}

  startProcess():Observable<any>{
    var variables = {
      processName:this.processName
    }
    const url = `${this.baseUrl}/api/camunda/process/startProcessInstance/${this.processName}`;
    return this.http.post(url,{})
  }

  getActiveTask(): Observable<any>{
    const url = `${this.baseUrl}/api/camunda/task/getActiveTask/${this.globalService.getGlobalVariable()}`;
    return this.http.get(url);
  }
  
  completeTask():Observable<any>{
    var variables = {
      taskId:this.globalService.getGlobalTaskId()
    }
    const url = `${this.baseUrl}/api/camunda/task/completeActiveTask/${this.globalService.getGlobalTaskId()}`;
    return this.http.post(url,{})
  }

}
