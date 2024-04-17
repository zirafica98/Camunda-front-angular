import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  globalProcessId: any;
  globalTaskId: any;
  globalUserName:any;
  globalTaskKey:any;
  globalTaskJSON:string="";
  globalCodeBook:any;
  globalSelectTownShipCodeBookCode:any = "";
  globalSelectPlaceCodeBookCode:any;
  globalSelectStreetCodeBookCode:any;
  private townShipValueSubject = new BehaviorSubject<any>('');
  townShipValue$ = this.townShipValueSubject.asObservable();
  private placeValueSubject = new BehaviorSubject<any>('');
  placeValue$ = this.placeValueSubject.asObservable();

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

  setGlobalTaskJSON(value:any):void{
    this.globalTaskJSON = value;
  }
  
  getGlobalTaskJSON():any{
    return this.globalTaskJSON;
  }
  setGlobalCodeBook(value:any):any{
    this.globalCodeBook = value;
  }

  getGlobalCodeBook():any{
    return this.globalCodeBook;
  }

  setGlobalTownShipCodeBook(value:any):any{
    this.globalSelectTownShipCodeBookCode = value;
  }

  getGlobalTownShipCodeBook():any{
    return this.globalSelectTownShipCodeBookCode;
  }

  setTownShipCodeValue(newValue: any) {
    this.townShipValueSubject.next(newValue);
  }

  setGlobalPlaceCodeBook(value:any):any{
    this.globalSelectPlaceCodeBookCode = value;
  }

  getGlobalPlaceCodeBook():any{
    return this.globalSelectPlaceCodeBookCode;
  }

  setPlaceCodeValue(newValue:any){
    this.placeValueSubject.next(newValue);
  }
  
  setGlobalSelectStreetCodeBookCode(value:any){
    this.globalSelectStreetCodeBookCode = value;
  }
  

  isDev():boolean{
    return true;
  }
}
