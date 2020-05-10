import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {
  countries: any = [];

  filteredCountries: any=[];

  private  _searchTerm: string;

  get searchTerm():string{
    return this._searchTerm;
  }
  set searchTerm(value: string)
  {
    this._searchTerm = value;
    this.filteredCountries = this.filterData(this._searchTerm);
  }

  constructor(private http : HttpClient ) 
  { 
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
            this.countries.push(tempArr);
        }
        this.filteredCountries = this.countries;
      }
        );
    
   }
   filterData(value: string):void{
  return this.countries.filter((country)=>
          country[0].toLowerCase().indexOf(value.toLowerCase())!==-1  
    )
   }
  
  ngOnInit(): void {
  }

}
