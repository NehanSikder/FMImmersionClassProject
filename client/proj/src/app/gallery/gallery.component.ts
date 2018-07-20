import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from  '../api.service';
import { GalleryService } from  '../gallery.service';
//import { RealtorService } from  '../realtor.service';




@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  houses : Array<House>;
  principalInput : number;
  // constructor(private http : HttpClient, private  apiService:  APIService, private galleryService: GalleryService, private realtorService: RealtorService) {
  //   this.houses = new Array<House>();
  // }

  constructor(private http : HttpClient, private  apiService:  APIService, private galleryService: GalleryService) {
    this.houses = new Array<House>();
  }

  ngOnInit() {
  //  this.realtorService.currentMessage.subscribe(message => this.reload = message);

    this.apiService.getData().subscribe(data => {
        console.log(typeof(data));
        for (let house of data["houses"]) {
          var newHouse = new House(
            house.phone_number,
            house.realtorEmail,
            house.primary_key,
            house.realtorFname,
            house.realtorLname,
            house.address,
            house.price,
            house.picURL

          );
          this.houses.push(newHouse);
        }
    });
    this.galleryService.currentMessage.subscribe(message => this.principalInput = message);
  }

  insertPrincipleToCalculator(housePrice,element){
    //insert house principal into calculator
      this.galleryService.newMessage(housePrice);
    //scroll down to calculator
    var elmnt = document.getElementById("calculator");
    console.log(elmnt);
    elmnt.scrollIntoView();

  }


}

export class House {
  constructor(
    public phone_number : string,
    public realtorEmail : string,
    public primary_key : number,
    public realtorFname : string,
    public realtorLname : string,
    public address : string,
    public price : number,
    public picURL : string,
  ) {

  }
}
