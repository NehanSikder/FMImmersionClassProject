import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RealtorComponent } from './Realtor/realtor.component';
import { LandingComponent } from './landing/landing.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HttpClientModule } from '@angular/common/http';

import { APIService } from  './api.service';


import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RealtorComponent,
    LandingComponent,
    GalleryComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
		RouterModule.forRoot([
			{
				path: 'landing',
				component: LandingComponent
      },
      {
				path: 'home',
				component: HomeComponent
      },
      {
				path: 'realtor',
				component: RealtorComponent
			}
		]),
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBEHLjxQrMH3BbMhtjYG89O-7IKx05uwPw'
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
