import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { APIService } from  '../api.service';
import { HttpClient } from '@angular/common/http';

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
  paymentAmount: string;
  totalInterest: string;
  totalCost: string;
  show_graph: boolean = false;
  houseList: Array<object> = [];


  chart = [];

  monthsMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private http : HttpClient, private  apiService:  APIService) {
    this.rate = null;
    this.principal = null;
    this.years = null;
  }

  public getData(){
    this.apiService.getData().subscribe((data:  Array<object>) => {
          this.houseList  =  data;
          console.log(data);
      });
  }
  graphMortgage(decimalRate){

    let axis = [];
    var fixedPMT = this.fixedPMT(this.principal, decimalRate, this.years);
    var dataArr = this.findPaymentStatistics(this.principal, decimalRate, this.years);
    var principalArr = dataArr[0];
    var interestArr = dataArr[1];

    var date = new Date();
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();

    for(var i = 0; i <= 12 * this.years; i++){
      if((i + currentMonth) % 12 == 0 && i > 0){
        currentYear = currentYear + 1;
      }

      axis[i] = this.monthsMap[(i + currentMonth) % 12] + ", " + currentYear;
    }

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: axis,
        datasets: [
          {
            label: "Principal Paid",
            data: principalArr,
            borderColor: '#30638E',
            borderWidth: 3,
          },
          {
            label: "Interest Paid",
            data: interestArr,
            borderColor: '#ED6A5A',
            borderWidth: 3,
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Principal and Interest Paid Over Time',
          fontSize: 18
        },
        legend: {
          display: true,
          position: 'top'
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
                    display:true
                }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Money',
            },
            gridLines: {
                    display:true
                },
            ticks: {
              suggestedMin: 0
            }
          }]
        }
      }
  })
  }

  ngOnInit() {
    // Calculations here to set ex
        
        // this.getData()
        let axis = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
        Chart.defaults.global.defaultFontColor = '#000';
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: axis,
          },
          options: {
            title: {
              display: true,
              text: 'Principal and Interest Paid Over Time',
              fontSize: 18
            },
            legend: {
              display: true,
              position: 'right'
            },
            scales: {
              xAxes: [{
                display: true,
              }],
              yAxes: [{
                display: true,
                ticks: {
                  beginAtZero: true,
                  stepSize: 1000,
                  max: 5000,
                  min: 0,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Money',
                }
              }]
            }
          }
      })
  }

  calculate() {
    // convert percent to decimal
      var decimalRate = this.rate / 100;
    //validate input fields
    //none of the input fields should be empty
      if( !(this.principal) )
      {
        alert("User needs to input the principal amount")
        return;
      }
      if( !(this.rate) )
      {
        alert("User needs to input the intrest rate amount and interest rate cannot be 0")
        return;
      }
      if( !(this.years) )
      {
        alert("User needs to input the number of years")
        return;
      }
    //interest rate cant be greater 100 and lower than 1
      if (this.rate > 100 || this.rate < 0){
        alert("Interest rate cannot be less than 0 or greater than 100")
        return;
      }
    //pricipal ammount cant be negative
      if (this.principal < 0){
        alert("Principal ammount cannot be a negative value")
        return;
      }
    //years cant be negative
      if (this.years < 0){
        alert("Number of years cannot be a negative value")
        return;
      }

    // set value for paymentAmount
    this.paymentAmount = (this.fixedPMT(this.principal, decimalRate, this.years)).toFixed(2);

    // set value for totalInterest
    var totalInterestFloat = this.calculateTotalInterest(this.principal, decimalRate, this.years);
    this.totalInterest = (totalInterestFloat).toFixed(2);
    // set value for total amount
    this.totalCost = (totalInterestFloat + this.principal).toFixed(2);
    //console.log(this.principal, this.totalCost);
    this.graphMortgage(decimalRate);


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
