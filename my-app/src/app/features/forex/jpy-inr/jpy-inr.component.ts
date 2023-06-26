import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { first } from 'rxjs';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-jpy-inr',
  templateUrl: './jpy-inr.component.html',
  styleUrls: ['./jpy-inr.component.css']
})
export class JpyInrComponent implements OnInit{

  constructor(private http: HttpClient){}

  forexRates:Object={};
  jpyRate:GLfloat=0.0;

  
  getData(){
    // const result = this.http.get("http://data.fixer.io/api/latest?access_key=e1f6ae9f9a60c78b40567a88caee4aee");
    // fetch("http://data.fixer.io/api/latest?access_key=e1f6ae9f9a60c78b40567a88caee4aee&base=EUR&symbols=INR")
    this.http.get("http://data.fixer.io/api/latest?access_key=e1f6ae9f9a60c78b40567a88caee4aee").pipe(first()).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.jpyRate= ( parseFloat( data['rates']['INR'] ))/(parseFloat(data['rates']['JPY']));
      },
      error:(err)=>{
        console.log(err);

      }
      
    }) 
  }


  getGraphData(){
    // const result = this.http.get("http://data.fixer.io/api/latest?access_key=e1f6ae9f9a60c78b40567a88caee4aee");
    // fetch("http://data.fixer.io/api/latest?access_key=e1f6ae9f9a60c78b40567a88caee4aee&base=EUR&symbols=INR")
    this.http.get("http://localhost/test/JPY.php").pipe(first()).subscribe({

      next:(data:any)=>{
        
        const labels = data.map((item: { date: any; }) => item.date);
        const rates = data.map((item: { open: any; }) => item.open);
        

        const canvas = <HTMLCanvasElement> document.getElementById('currencyChart');
      const ctx = canvas.getContext('2d');
          const chart = new Chart(ctx!, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Currency Rate',
                  data: rates,
                  borderColor: 'rgba(255, 192, 192, 1)',
                  backgroundColor: 'rgba(255, 192, 192, 0.2)',
                  fill: true
                }
              ]
            },
            options: {
              // Customize the chart options here
            }
          });

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


}
