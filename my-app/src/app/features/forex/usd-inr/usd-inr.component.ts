import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { first } from 'rxjs';
import { Chart } from 'chart.js/auto';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-usd-inr',
  templateUrl: './usd-inr.component.html',
  styleUrls: ['./usd-inr.component.css']
})
export class UsdInrComponent implements OnInit{

  constructor(private http: HttpClient){}

  forexRates:Object={};
  inrRate:GLfloat=0.0;
  highRate:GLfloat=0.0;
  closeRate:GLfloat=0.0;
  lowRate:GLfloat=0.0;



  
  getData(){
    // const result = this.http.get("http://data.fixer.io/api/latest?access_key=e1f6ae9f9a60c78b40567a88caee4aee");
    // fetch("http://data.fixer.io/api/latest?access_key=e1f6ae9f9a60c78b40567a88caee4aee&base=EUR&symbols=INR")
    // this.http.get("http://data.fixer.io/api/latest?access_key=e1f6ae9f9a60c78b40567a88caee4aee").pipe(first()).subscribe({
    //   next:(data:any)=>{
    //     console.log(data);
    //     this.inrRate= ( parseFloat( data['rates']['INR'] ))/(parseFloat(data['rates']['USD']));
    //   },
    //   error:(err)=>{
    //     console.log(err);

    //   }
      
    // }) 
    this.http.get("http://localhost/test/INR.php").pipe(first()).subscribe({

    next:(data:any)=>{
      // console.log(data); 

 
      for(let i = 0; i < data.length; i++) {
        let obj = data[i];

        this.inrRate= obj.open; 
        this.closeRate = obj.close;
        this.highRate = obj.high; 
        this.lowRate = obj.low; 
      }
         

    },

    error:(err)=>{
      console.log(err);
    }
    
  }) 
  }

  sixmonth(){
    console.log("six"); 
  }
  threemonth(){
    console.log("three"); 
  }
  oneyear(){
    console.log("one year"); 
  }

  getGraphData(){
    // const result = this.http.get("http://data.fixer.io/api/latest?access_key=e1f6ae9f9a60c78b40567a88caee4aee");
    // fetch("http://data.fixer.io/api/latest?access_key=e1f6ae9f9a60c78b40567a88caee4aee&base=EUR&symbols=INR")
    this.http.get("http://localhost/test/INR.php").pipe(first()).subscribe({

      next:(data:any)=>{
        // console.log(data); 

        for(let i = 0; i < data.length; i++) {
          let obj = data[i];
          // console.log(obj.date);
          this.inrRate= obj.rate; 
        }
        
        const dates = data.map((item: { date: any; }) => item.date);
        const rates = data.map((item: { open: any; }) => item.open);

        const filter = [];
        const filter2 = [];
        for(let i = 0 ; i < 100; i++) {
            let obj = data[data.length - 1 - i]; 
            filter.push(obj.date); 
            filter2.push(obj.open); 
        }
        filter.reverse(); 
        filter2.reverse(); 

        if (this.fontStyle == "bold") console.log("hi");
        // const convertedDates = dates.map(( date => new Date(dates).setHours(0,0,0,0));

        const canvas = <HTMLCanvasElement> document.getElementById('currencyChart');
      const ctx = canvas.getContext('2d');
          const chart = new Chart(ctx!, {
            type: 'line',
            data: {
              labels: filter,
              datasets: [
                {
                  label: 'Currency Rate',
                  data: filter2,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: true
                }
              ]
            },
            options: {
              // Customize the chart options here
            }
          });
          // const convertedDates = labels.map(data=> new Date(date).setHours(0,0,0,0));
          // const filterDates = convertedDates.filter(Date =>)

      },

      error:(err)=>{
        console.log(err);
      }
      
    }) 
  }


  ngOnInit(): void {
    this.getGraphData();
    this.getData();

  }
  fontStyleControl = new FormControl('');
  fontStyle?: string;



  
}
