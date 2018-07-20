import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from  '../api.service';
import { RealtorService } from  '../realtor.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  api_key: string = 'AIzaSyBEHLjxQrMH3BbMhtjYG89O-7IKx05uwPw'
  coordinates: Array<Coordinate> = new Array<Coordinate>();
  house_markers: Array<House> = new Array<House>();
  start_zoom_lat: number = 38.9588879
  start_zoom_lng: number = -77.4022208
  address_parameter: string = '';

  constructor(private http : HttpClient, private  apiService:  APIService, private realtorService: RealtorService) {
    //this.house_markers = new Array<House>();
  }

  ngOnInit() {
  this.apiService.getData().subscribe(data => {

      for (let house of data["houses"]) {
        var address_split = house.address.split(" ")
        this.address_parameter = address_split[0];
        for(var i = 1; i < address_split.length; i++) {
          this.address_parameter =this. address_parameter + "+" + address_split[i]
        }

        var newHouseMarker = new House( house.phone_number,
                                              house.realtorEmail,
                                              house.realtorFname,
                                              house.realtorLname,
                                              house.address,
                                              house.price,
                                              house.picURL
                                            )
        this.house_markers.push(newHouseMarker)

        this.http.get<any>('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.address_parameter + 'key=' + this.api_key)
             .subscribe(data => {
               for (let geolocation of data["results"]) {
                 var newCoordinate = new Coordinate(geolocation.geometry.location.lat, geolocation.geometry.location.lng)
                 this.coordinates.push(newCoordinate)

              }
            });
      }
  });

  }


  doSomething(index: number) {

    this.realtorService.newMessage(this.house_markers[index].price);

    var elmnt = document.getElementById("calculator");
    elmnt.scrollIntoView();
  }



}
export class House {


  constructor(
    public phone_number : string,
    public realtorEmail : string,
    public realtorFname : string,
    public realtorLname : string,
    public address : string,
    public price : number,
    public picURL : string
  ) {
  }
}

export class Coordinate {


  constructor(
    public latitude: number,
    public longitude: number
  ) {
  }
}
