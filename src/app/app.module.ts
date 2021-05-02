import { BrowserModule } from '@angular/platform-browser';
import { APP_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayDataComponent } from './display-data/display-data.component';
import { FormsModule } from '@angular/forms'; 
import {HttpClientModule} from '@angular/common/http';
import { GetDataFromApiService } from './get-data-from-api.service';
import { IndiaStateWiseComponent } from './india-state-wise/india-state-wise.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes =[
  {path : '', component:DisplayDataComponent},
  {path : 'india', component:IndiaStateWiseComponent}
]
@NgModule({
  /*Components in module */
  declarations: [
    AppComponent,
    DisplayDataComponent,
    IndiaStateWiseComponent
  ],
    /*Modules imported in module */
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  /*Services used by Module*/
  providers: [GetDataFromApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
