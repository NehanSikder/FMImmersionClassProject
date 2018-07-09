import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // rate is ANNUAL INTEREST RATE
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
  

  testFixedPMT() {
    testSet = [(0,0,0), (100000, 6, 15)];
    // test not complete
  }

  fixedPMT(principle, rate, years){
    // P - principle
    // R - annual interest rate as a decimal!!!
    // Y - number of years
    var months = 12 * years;
    var monthlyRate = rate/12;
    var temp = (monthlyRate * Math.pow((1 + monthlyRate),months))/(Math.pow((1 + monthlyRates),months) - 1);
    return principle * temp;
  }

  findPaymentStatistics(principle, rate, years) {
    // returns a map of principle paid and interest paid per month
    var payments = years * 12;
    var returnMap = {
      'principle' : [null] * payments,
      'interest' : [null] * payments
    }
    var myFixedPMT = this.fixedPMT(principle, rate, years);
    var currentPrinciple = principle;

    for (var i = 0 ; i < payments; i++) {
      // loops through and adds values to the map
      returnMap['principle'][i] = this.principal(myFixedPMT, currentPrinciple, rate);
      returnMap['interest'][i] = this.interest(myFixedPMT, currentPrinciple, rate);
      // update the leftover principle that still needs to be paid
      currentPrinciple = currentPrinciple - returnMap['principle'][i];
    }



  }
  principle(fixedPMT, principle, rate) {
    // fixedPMT is the fixed payment 
    // P is the current principle amount
    // R is the annual interest rate
    var monthlyRate = rate/12;
    var next = principle - (principle* monthlyRate)
    return fixedPMT - (principle - next)
    
  }

  interest(fixedPMT, principle, rate) {
    // fixedPMT is the fixed payment 
    // P is the current principle amount
    // R is the annual interest rate
    var monthlyRate = rate / 12;
    var next = principle - (principle * monthlyRate)
    return (principle - next)

  }

}
