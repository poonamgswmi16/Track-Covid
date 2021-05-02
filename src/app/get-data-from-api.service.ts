import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataFromApiService {
  countries: any ;
  constructor(private http : HttpClient ) 
  { 
   
  }

   getWorldData ()
   {
    return this.http.get('https://pomber.github.io/covid19/timeseries.json')
   }
   getIndiaData ()
   {
    return this.http.get('https://api.rootnet.in/covid19-in/stats/history')
   }

   peak = new BehaviorSubject<any>(0)
}
