import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from  '../api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  houses : Array<House>;
  constructor(private http : HttpClient, private  apiService:  APIService) {
    this.houses = new Array<House>();
  }

  ngOnInit() {
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
            house.pictures
          );
          this.houses.push(newHouse);
        }
    }); 
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
    public pictures : Array<string>,
  ) {

  }
}
