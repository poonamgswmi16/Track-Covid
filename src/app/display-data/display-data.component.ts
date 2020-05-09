import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {
  alphas: any = [];

  constructor(private http : HttpClient ) {
    
    http.get('https://pomber.github.io/covid19/timeseries.json')
      .subscribe((response)=> {
        var totalArr =[];
        for( let country in response)
        {
            var tempArr = [];
            let newCases = response[country][response[country].length-1].confirmed -response[country][response[country].length-2].confirmed;
            tempArr.push(country);
            tempArr.push(response[country][response[country].length-1].confirmed)
            tempArr.push(newCases);
            tempArr.push(response[country][response[country].length-1].deaths)
            tempArr.push(response[country][response[country].length-1].recovered)
            this.alphas.push(tempArr);
        }
      }
        );
    
   }

  ngOnInit(): void {
  }

}
