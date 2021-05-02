import { Component, OnInit } from '@angular/core';
import { GetDataFromApiService } from '../get-data-from-api.service';

@Component({
  selector: 'app-india-state-wise',
  templateUrl: './india-state-wise.component.html',
  styleUrls: ['./india-state-wise.component.css']
})
export class IndiaStateWiseComponent implements OnInit {
  private _searchTerm: string;
  states: any = [];
  filteredStates: any = undefined;
  constructor(private getDataFromApi :GetDataFromApiService) { }

  ngOnInit(): void {
    this.getDataFromApi.getIndiaData() .subscribe((response)=> {
      this.states = []
      
      var lastDayObj
      for( let responseData in response)
      {
        if(responseData=="data")
        {
         lastDayObj = response[responseData][response[responseData].length-1]
        }
      }
      var objData
      for(let d in lastDayObj)
      {
         objData = lastDayObj[d]
      }
      for(let x in objData)
      {
        var tempArr = [];  
        tempArr.push(objData[x].loc)
        tempArr.push(objData[x].confirmedCasesIndian)
        tempArr.push(25)
        tempArr.push(objData[x].deaths)
        console.log(objData[x])
        this.states.push(tempArr)
      }
      this.filteredStates =  this.states
     console.log(this.states)
  })
}

get searchTerm(): string {
  return this._searchTerm;
}
set searchTerm(value: string) {
  this._searchTerm = value;
 // this.filteredStates = this.filterData(this._searchTerm);
}

filterData(value: string): void {
  return this.states.filter((country) =>
    country[0].toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}

}
