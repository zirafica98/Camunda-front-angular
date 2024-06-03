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
  globalSelectMunicipalityCodeBookCode:any = "";
  globalSelectPlaceCodeBookCode:any;
  globalSelectStreetCodeBookCode:any;
  private municipalityValueSubject = new BehaviorSubject<any>('');
  municipalityValue$ = this.municipalityValueSubject.asObservable();
  private placeValueSubject = new BehaviorSubject<any>('');
  placeValue$ = this.placeValueSubject.asObservable();
  params:number[]=[];

  private subtitle = new BehaviorSubject<string>('');
  subtitle$ = this.subtitle.asObservable();

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

  setGlobalMunicipalityCodeBook(value:any):any{
    this.globalSelectMunicipalityCodeBookCode = value;
  }

  getGlobalMunicipalityCodeBook():any{
    return this.globalSelectMunicipalityCodeBookCode;
  }

  setMunicipalityCodeValue(newValue: any) {
    this.municipalityValueSubject.next(newValue);
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

  getParams():number[]{
    return this.params;
  }

  setParams(p1:number,p2:number,p3:number){
    this.params=[];
    this.params.push(p1);
    this.params.push(p2);
    this.params.push(p3);
  }
  
  setSubtitle(newValue:string){
    this.subtitle.next(newValue);
  }

  isDev():boolean{
    return true;
  }
}
