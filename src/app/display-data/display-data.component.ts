import { Component, OnInit, Input , OnChanges, SimpleChanges} from '@angular/core';
import { GetDataFromApiService } from '../get-data-from-api.service';

@Component({
  selector: 'display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {

  
  countries: any = [];
  filteredCountries: any = undefined;

  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredCountries = this.filterData(this._searchTerm);
  }

  constructor(private getDataFromApi :GetDataFromApiService) {    
    
 

  }

  filterData(value: string): void {
    return this.countries.filter((country) =>
      country[0].toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  ngOnInit(): void {    
    this.getDataFromApi.getData() .subscribe((response)=> {
      
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
                      
          // if(country=="India") 
          // {     let max=0;
          //     for(let i=0;i<response[country].length-1;i++ )
          //     {
          //       let dailyNew = response[country][i+1].confirmed-response[country][i].confirmed
                               
          //       if(dailyNew > max)
          //         max = dailyNew
          //     }
          //     console.log(max)
          //     console.log(response[country])
          //     tempArr.push(max);
          // }
          // console.log(tempArr)
          this.countries = this.countries.slice();
          this.filteredCountries = this.countries;    
          this.filteredCountries.sort((a,b)=>{
           return b[1]-a[1];
           })
      }
    }
      );
  
    
  }
  // ngOnChanges (changes : SimpleChanges)
  // {
  //    this.countries = this.countries.slice();
  //    this.filteredCountries = this.countries;    
  // }
 
}
