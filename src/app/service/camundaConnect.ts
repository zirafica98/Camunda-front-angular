import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})

export class CamundaService {

  private baseUrl: string = 'http://localhost:8080/engine-rest'; 

  constructor(private http: HttpClient){}

  startProcess(procesDefinitionKey:string,variables:any):Observable<any>{
    const url = `${this.baseUrl}/process-definition/key/${procesDefinitionKey}/start`;
    return this.http.post(url,{variables})
  }

  getTasks(processInstanceId:string):Observable<any>{
    const url=`${this.baseUrl}/task?processInstanceId=${processInstanceId}`
    return this.http.get(url);
  }

  completeTask(taskId:string,variables:any):Observable<any>{
    const url = `${this.baseUrl}/task/${taskId}/complete`;
    return this.http.post(url,{variables})
  }

  executeServiceTask(taskId: string): Observable<any> {
    const url = `http://localhost:8080/engine-rest/task/${taskId}/complete`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, {}, { headers });
  }

  getVariableAfterTask(processInstanceId:string):Observable<any>{
    const url=`${this.baseUrl}/history/variable-instance?processInstanceId=${processInstanceId}`
    return this.http.get(url);
  }

}
