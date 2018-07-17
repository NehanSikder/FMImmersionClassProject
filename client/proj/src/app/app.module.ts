import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RealtorComponent } from './Realtor/realtor.component';
import { HttpClientModule } from '@angular/common/http';

import { APIService } from  './api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RealtorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
