import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


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

  chart = [];

  monthsMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() {
  }

  graphMortgage(){

    var fixedPMT = this.fixedPMT(this.principal, this.rate, this.years);
    let balanceData = [];
    let axis = [];

    var date = new Date();
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();

    for(var i = 0; i <= 12 * this.years; i++){
      balanceData[i] = this.calculateBalance(this.principal, i, this.years, this.rate);

      if((i + currentMonth) % 12 == 0 && i > 0){
        currentYear = currentYear + 1;
      }

      axis[i] = this.monthsMap[(i + currentMonth) % 12] + ", " + currentYear;
    }

    let function2 = [];

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: axis,
        datasets: [
            label: "Balance on Loan",
            data: balanceData,
            borderColor: '#0082c8',
            fill: 'true'
          },
          {
            label: "Function 2",
            data: function2,
            borderColor: '#e6194b',
            fill: 'false'
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'The Mortgage Calculator'
        },
        legend: {
          display: true,
          position: 'right'
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
  })

  }

  ngOnInit() {
    // Calculations here to set ex

        let axis = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
        let function1 = []
        let function2 = []

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: axis,
          },
          options: {
            title: {
              display: true,
              text: 'The Mortgage Calculator'
            },
            legend: {
              display: true,
              position: 'right'
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
      })
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

  calculateBalance(principal, currentMonth, years, rate){

    var monthlyRate = (rate / 100) / 12;
    var totalMonths = 12 * years;

    var temp1 = Math.pow(1 + monthlyRate, totalMonths) - Math.pow(1 + monthlyRate, currentMonth);
    var temp2 = Math.pow(1 + monthlyRate, totalMonths) - 1;
    var balance = principal * (temp1 / temp2)

    return balance;
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
