import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})

export class DataLoader {

  private baseUrl: string = 'https://localhost:44386'; 

  constructor(private http: HttpClient,private globalService:GlobalService){}

  
  
  getCodeBook():Observable<any>{  
    const url = `${this.baseUrl}/api/Codebook/getCodebookData/JG2TERIT`;
    return this.http.get(url);
  }

  getCodeBookPlace(placeId:any):Observable<any>{ 
    const url = `${this.baseUrl}/api/Codebook/getCodebookPlacesCorporate/${placeId}`;
    return this.http.get(url);
  }

  getCodeBookStreet(streetCode:any){
    const placeId = this.globalService.getGlobalMunicipalityCodeBook();
    const url = `${this.baseUrl}/api/Codebook/getCodebookStreetsCorporate/${placeId}/${streetCode}`;
    return this.http.get(url);
  }

}
