import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   
  countries: any ;
  constructor(private http : HttpClient ) 
  { 
    http.get('https://pomber.github.io/covid19/timeseries.json')
      .subscribe((response)=> {
        var totalArr =[];
        this.countries=[]
        for( let country in response)
        {
            var tempArr = [];
            let newCases = response[country][response[country].length-1].confirmed -response[country][response[country].length-2].confirmed;
            tempArr.push(country);
            tempArr.push(response[country][response[country].length-1].confirmed)
            tempArr.push(newCases);
            tempArr.push(response[country][response[country].length-1].deaths)
            tempArr.push(response[country][response[country].length-1].recovered)
            this.countries.push(tempArr);
        }
        
        
      }
        );
    
   }

}
