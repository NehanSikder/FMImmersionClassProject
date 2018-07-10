import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // rate is ANNUAL INTEREST RATE as a decimal < 1
  rate: number;
  principal: number;
  years: number;
  paymentAmount: number;
  totalInterest: number;
  totalCost: number;

  constructor() {
  }

  ngOnInit() {
	  
  }

  calculate() {
    // convert percent to decimal
    var decimalRate = this.rate / 100;
  	
    // set value for paymentAmount
    var fixedPMT = this.fixedPMT(this.principal, decimalRate, this.years);
    this.paymentAmount = this.calculatePrincipal(fixedPMT, this.principal, decimalRate)

    console.log('fixedPMT',fixedPMT);
    console.log('this.principal',this.principal);
    console.log('this.rate',this.rate);
    console.log('this.calculatePrincipal',this.calculatePrincipal(fixedPMT, this.principal, decimalRate));



    // set value for paymentAmount

    // set value for paymentAmount

  }
  

  testFixedPMT() {
   // testSet = [(0,0,0), (100000, 6, 15)];
    // test not complete
  }

  fixedPMT(principal, rate, years){
    // P - principal
    // R - annual interest rate as a decimal!!!
    // Y - number of years

    // convert percent to decimal
    var decimalRate = this.rate / 100;

    var months = 12 * years;
    var monthlyRate = decimalRate/12;
    var temp = (monthlyRate * Math.pow((1 + monthlyRate),months))/(Math.pow((1 + monthlyRate),months) - 1);
    return principal * temp;
  }

  calculatePrincipal(fixedPMT, principalInput, rate) {
    // fixedPMT is the fixed payment 
    // P is the current principalInput amount
    // R is the annual interest rate

    // convert percent to decimal
    var decimalRate = this.rate / 100;

    var monthlyRate = decimalRate/12;
    var next = principalInput - (principalInput* monthlyRate)
    return fixedPMT - (principalInput - next)
    
  }

  calculateInterest(fixedPMT, principalInput, rate) {
    // fixedPMT is the fixed payment 
    // P is the current principalInput amount
    // R is the annual interest rate


    // convert percent to decimal
    var decimalRate = this.rate / 100;

    var monthlyRate = decimalRate / 12;
    var next = principalInput - (principalInput * monthlyRate)
    return (principalInput - next)
  }


/*
  findPaymentStatistics(principle, rate, years) {
    // returns a map of principle paid and interest paid per month
    
    // convert percent to decimal
    var decimalRate = this.rate / 100;

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

    return returnMap;
  }
*/


}
