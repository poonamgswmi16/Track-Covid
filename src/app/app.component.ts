import { Component } from '@angular/core';
import { CallApiService } from './call-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private svc : CallApiService)
  {
       svc.fetchApiData();
  }

}
