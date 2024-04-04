import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  globalProcessId: any;
  globalTaskId: any;
  globalUserName:any;
  globalTaskKey:any;
  globalCodeBook:any;

  constructor() { }

  setGlobalVariable(value: any): void {
    this.globalProcessId = value;
  }

  getGlobalVariable(): any {
    return this.globalProcessId;
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

  getGlobalUserName():any{
    return this.globalUserName;
  }

  setGlobalTaskKey(value:any):void{
    this.globalTaskKey = value;
  }
  
  getGlobalTaskKey():any{
    return this.globalTaskKey;
  }

  setGlobalCodeBook(value:any):any{
    return this.globalCodeBook;
  }

  getGlobalCodeBook():any{
    return this.getGlobalCodeBook;
  }
}
