import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  globalVariable: any;
  globalTaskId: any;
  globalUserName:any;

  constructor() { }

  setGlobalVariable(value: any): void {
    this.globalVariable = value;
  }

  getGlobalVariable(): any {
    return this.globalVariable;
  }

  setGlobalTaskId(value:any):void{
    this.globalTaskId = value;
  }
  
  getGlobalTaskId(): any{
    return this.globalTaskId;
  }

  setGloablUserName(value:any):void{
    this.globalUserName = value;
  }

  getGlobalUserName(value:any):void{
    return this.globalUserName;
  }
}
