import { Component, OnInit, Input , OnChanges, SimpleChanges} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit , OnChanges{

  @Input('data') county: any[];
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

  constructor() {
  

  }

  filterData(value: string): void {
    return this.countries.filter((country) =>
      country[0].toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  ngOnInit(): void {
    console.log("From display Data Component" + this.county)
  }
  ngOnChanges (changes : SimpleChanges)
  {
     this.countries = this.county.slice();
     this.filteredCountries = this.countries;    
  }

}
