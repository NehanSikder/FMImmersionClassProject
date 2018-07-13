import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realtor',
  templateUrl: './realtor.component.html',
  styleUrls: ['./realtor.component.scss']
})
export class RealtorComponent implements OnInit {

  address: string;
  price: number;
  realtorFname: string;
  realtorLname: string;
  realtorEmail: string;
  phone_number: string;


  constructor() {
  }

  ngOnInit() {

  }

  submitPosting(){

    console.log(this.address)
    console.log(this.price)
    console.log(this.realtorFname)
    console.log(this.realtorLname)
    console.log(this.realtorEmail)
    console.log(this.phone_number)

  }

}
