import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rate: number;
  principal: number;
  years: number;
  total: number;



  constructor() { }

  ngOnInit() {
	  
  }

  calculate() {
  	this.total = this.principal+this.rate+this.years;
  }

}
