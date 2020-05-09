import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayDataComponent } from './display-data/display-data.component';
import {CallApiService} from './call-api.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  /*Components in module */
  declarations: [
    AppComponent,
    DisplayDataComponent
  ],
    /*Modules imported in module */
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  /*Services used by Module*/
  providers: [CallApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
