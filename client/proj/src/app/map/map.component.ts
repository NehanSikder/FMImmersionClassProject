import { Component, OnInit } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {Observable} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  latitude_list = new Array();
  longitude_list = new Array();
  address_list: {latitude_coordinate: number, longitude_coordinate: number}[];

  latitude: number = 38.978984;
  longitude: number =  -77.400354;
  api_key: string = 'AIzaSyBEHLjxQrMH3BbMhtjYG89O-7IKx05uwPw'

//  constructor(private http: HttpClient) {
//  }
  ngOnInit() {
    // Construct the address list by making a db request to get address coordinates of markers. Store the values in this.address_list
    // the initialization of the address list can be taken out once the coordinates can be obtained from db
    // this.address_list = getAddressCoordinates();
    this.address_list = [
      {
        latitude_coordinate:  38.958984,
        longitude_coordinate: -77.400354
      },
      {
        latitude_coordinate: 38.978984,
        longitude_coordinate: -77.400354
      },
      {
        latitude_coordinate: 38.938984,
        longitude_coordinate: -77.400354
      }
  ]


  }

/*
  getCoordinates(address: string){
      var address_split = address.split(" ")
      var address_parameter: string = address_split[0];
      for(var i = 1; i < address_split.length; i++)
        address_parameter = address_parameter + "+" + address_split[i]
      // return this.http.get<string>('https://maps.googleapis.com/maps/api/geocode/json?address=' + address_parameter + 'key=' + this.api_key).subscribe(data => this.coordinates = data
      return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address_parameter + 'key=' + this.api_key);
  }
*/

}
