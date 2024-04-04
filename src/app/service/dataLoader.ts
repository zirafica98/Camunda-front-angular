import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})

export class DataLoader {

  private baseUrl: string = 'http://localhost:7262'; 

  constructor(private http: HttpClient,private globalService:GlobalService){}

  
  
  getCodeBook():Observable<any>{
    
    const url = `${this.baseUrl}/api/Codebook/getCodebookData/JG2TERIT`;
    return this.http.get(url);
  }

}
