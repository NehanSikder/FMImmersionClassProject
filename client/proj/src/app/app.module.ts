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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RealtorComponent,
    LandingComponent,
    GalleryComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
