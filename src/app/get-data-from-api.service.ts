import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDataFromApiService {
  countries: any ;
  constructor(private http : HttpClient ) 
  { 
   
  }

   getData ()
   {
    return this.http.get('https://pomber.github.io/covid19/timeseries.json')
   }
}
