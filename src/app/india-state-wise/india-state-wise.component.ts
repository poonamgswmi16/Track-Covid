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
  state: any = [];
  count: any =[];
  stateData: any = [];
  countryCount: any = [];
  filteredStates: any = undefined;

  private _searchState: string;

  get searchState(): string {
    return this._searchTerm;
  }
  set searchState(value: string) {
    this._searchTerm = value;
    this.filteredStates = this.filterData(this._searchTerm);
  }

  constructor(private getDataFromApi :GetDataFromApiService) { }

  ngOnInit(): void {
    var deathMap = new Map()
  
    this.getDataFromApi.getIndiaData().subscribe((response)=> {
      
      var lastDayObj     
      
           let resDataLen = response["data"].length
           lastDayObj = response["data"][resDataLen-1]
       
        for(let obj in lastDayObj['regional'])
        {
          deathMap.set(lastDayObj['regional'][obj].loc, lastDayObj['regional'][obj].deaths)        
        }
          
    })
    if(!localStorage.getItem("stateData"))
    {		
        this.getDataFromApi.getStateData().subscribe((response)=> {      
            
          this.processResposeData(response, deathMap)
          localStorage.setItem('stateData', JSON.stringify(response)) 
    
      })
    }else{
      var jsonData =JSON.parse(localStorage.getItem('stateData'))     
      this.processResposeData(jsonData, deathMap) 

      this.getDataFromApi.getStateData().subscribe((response)=> {      

        this.processResposeData(response, deathMap)
        localStorage.setItem('stateData', JSON.stringify(response)) 
  
    })
    }
}

processResposeData(response,  deathMap)
{
  this.state = []
  this.states = []
  
  this.countryCount =0 
  this.count=0;
  for(let q in response[0])
  {
      ++this.count;
  }
  for(let v in response)
  {  let totalStateCount=0 
    let in24hr =0
    let in48hr =0
    let in72hr = 0;
    let counter =0;
    let stateData= []
    let maxArray = new Map();
    
    for(let k in response[v])
    {
      if(!isNaN(response[v][k]))
      {
        totalStateCount = response[v][k]
      
        if(maxArray.size==0)
        {
          maxArray.set(1,"DD")
          maxArray.set(totalStateCount, "Date")   
        }   
        else {
            const sum =  [ ...maxArray.keys() ].reduce( (a, b) => a + b)
              if(totalStateCount-sum>0)
                maxArray.set(totalStateCount-sum , k)
        }
      }if (counter==this.count-2){
          in24hr =response[v][k]
      }else if (counter==this.count-3){
          in48hr =response[v][k]
      }else if (counter==this.count-4){
        in72hr =response[v][k]
    }
      counter++;
    }

  stateData.push(response[v]['State UT'])
  stateData.push(totalStateCount)
  if(in24hr-in48hr!=0)
  stateData.push(in24hr-in48hr)
  else stateData.push(in48hr-in72hr)
  stateData.push(deathMap.get(response[v]['State UT']))
  stateData.push(Math.max(...maxArray.keys()))
  stateData.push(maxArray.get(Math.max(...maxArray.keys())))
  this.states.push(stateData)
  }
 
  this.filteredStates =  this.states

  this.filteredStates.sort((a,b)=>{
    return b[1]-a[1];
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
