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
    this.rate = null;
    this.principal = null;
    this.years = null;
  }

  graphMortgage(decimalRate){
    var fixedPMT = this.fixedPMT(this.principal, decimalRate, this.years);
    let balanceData = [];
    let axis = [];
    var dataArr = this.findPaymentStatistics(this.principal, decimalRate, this.years);
    var principalArr = dataArr[0];
    var interestArr = dataArr[1];



    var date = new Date();
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();

    for(var i = 0; i <= 12 * this.years; i++){
//      balanceData[i] = this.calculateBalance(this.principal, i, this.years, this.rate);

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
          {
            label: "Balance on Loan",
            data: principalArr,
            borderColor: '#0082c8',
            fill: 'true'
          },
          {
            label: "Function 2",
            data: interestArr,
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
    console.log("rate",this.rate);
    console.log("years",this.years);
    console.log("prinicipal",this.principal);
    // convert percent to decimal
    var decimalRate = this.rate / 100;
    //validate input fields
    if( !(this.principal) || !(this.rate) || !(this.years) ){
      alert("User needs to input value for all of the fields")
      return;
    }
    //none of the input fields should be empty
    //interest rate cant be greater 100 and lower than 1
    //pricipal ammount cant be negative
    //years cant be negative

    // set value for paymentAmount
    this.paymentAmount = this.fixedPMT(this.principal, decimalRate, this.years);

    // set value for totalInterest
    this.totalInterest = this.calculateTotalInterest(this.principal, decimalRate, this.years);
    // set value for total amount
    this.totalCost = this.totalInterest + this.principal;
    //graph 
      this.graphMortgage(decimalRate);


  }


  testFixedPMT() {
   // testSet = [(0,0,0), (100000, 6, 15)];
    // test not complete
  }


//rate HAS TO BE DECIMAL INPUT
  fixedPMT(principal, rate, years){
    // P - principal
    // R - annual interest rate as a decimal!!!
    // Y - number of years

    // convert percent to decimal

    var months = 12 * years;
    var monthlyRate = rate/12;
    var temp = (monthlyRate * Math.pow((1 + monthlyRate),months))/(Math.pow((1 + monthlyRate),months) - 1);
    return principal * temp;
  }


//rate HAS TO BE DECIMAL INPUT
  calculatePrincipal(fixedPMT, principalInput, rate) {
    // fixedPMT is the fixed payment
    // P is the current principalInput amount
    // R is the annual interest rate

    // convert percent to decimal

    var monthlyRate = rate/12;
    var next = principalInput - (principalInput* monthlyRate)
    return fixedPMT - (principalInput - next)

  }

  calculateInterest(fixedPMT, principalInput, rate) {
    // fixedPMT is the fixed payment
    // P is the current principalInput amount
    // R is the annual interest rate

    var monthlyRate = rate / 12;
    var next = principalInput - (principalInput * monthlyRate)
    return (principalInput - next)
  }

  calculateBalance(principal, currentMonth, years, rate){

    var monthlyRate = rate / 12;
    var totalMonths = 12 * years;

    var temp1 = Math.pow(1 + monthlyRate, totalMonths) - Math.pow(1 + monthlyRate, currentMonth);
    var temp2 = Math.pow(1 + monthlyRate, totalMonths) - 1;
    var balance = principal * (temp1 / temp2)

    return balance;
  }

  findPaymentStatistics(principle, rate, years) {
    // returns a map of principle paid and interest paid per month
    var payments = years * 12;

    var principleArr = new Array<number>(payments);
    var interest = new Array<number>(payments);
    console.log(principle, rate, years);
    var myFixedPMT = this.fixedPMT(principle, rate, years);
    var currentPrinciple = principle;
    for (var i = 0 ; i < payments; i++) {
      // loops through and adds values to the map
    principleArr[i] = this.calculatePrincipal(myFixedPMT, currentPrinciple, rate);
      interest[i] = this.calculateInterest(myFixedPMT, currentPrinciple, rate);

      // update the leftover principle that still needs to be paid
      currentPrinciple = currentPrinciple - principleArr[i];

    }

    return [principleArr, interest];
  }

   calculateTotalInterest(principalInput, rate, years) {
    //returns total interest
    //variable to hold total
    var totalInterest = 0;
    var interest = this.findPaymentStatistics(principalInput, rate, years)[1];
    var payments = years * 12;
    for (var i = 0 ; i < payments; i++) {
    // loops through and adds values to the totalInterest
      totalInterest = totalInterest + interest[i]; 
      
    }
    return totalInterest;
  }




}
