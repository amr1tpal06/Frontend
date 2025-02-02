import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {Chart, registerables} from 'chart.js'

Chart.register(...registerables);
@Component({
  selector: 'app-stats',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})

export class StatsComponent {
  authors:any[]=[]
  author_names:any[]=[]
  author_counts:any[]=[]

  public config:any; 
  public config_2:any;
  chart_2:any;
  chart:any;
  chart_3:any;
  config_3:any;

  books:any[]=[]
  number:Number=0
  highest:any=null
  lowest:any=null
  mostpages:any=null
  leastpages: any=null
  genres: any[]=[]
  genrebooks:any[]=[]

  numofbooks:number[]=[]
  genrenames:any[]=[]
  num:number=0
  audience:any[]=[]
  audience_names:any[]=[]
  audience_counts:any[]=[]
  status:any[]=[]
  status_names:any[]=[]
  status_counts:any[]=[]
  chart_4:any;
  config_4:any;
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://127.0.0.1:5000/')  
      .subscribe(
        response => {
          this.books = response ;
          this.number = this.books.length
        }
    );

    this.http.get<any[]>('http://127.0.0.1:5000/books-by-status')
      .subscribe(
        response => {
          this.status= response 
          for (const status of this.status) {
            this.status_names.push(status["status"])
            this.status_counts.push(status["count"])
          }

          this.config_4= {
            type: 'pie',
            data: { 
              labels: this.status_names, //x axis points
              datasets: [{data:this.status_counts}]  
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            },
          };
          this.chart_4= new Chart('chart_4',this.config_4);
        }
      )


    this.http.get<any[]>('http://127.0.0.1:5000/books-by-audience')
      .subscribe(
        response => {
          this.audience= response 
          for (const audience of this.audience) {
            this.audience_names.push(audience["audience"])
            this.audience_counts.push(audience["count"])
          }

          this.config_3= {
            type: 'bar',
            data: { 
              labels: this.audience_names, //x axis points
              datasets: [{data:this.audience_counts}] 
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            },
          };
          this.chart_3= new Chart('chart_3',this.config_3);
        }
      )

    this.http.get<any[]>('http://127.0.0.1:5000/books-by-genre') 
      .subscribe(
        response => {
          this.genres = response ;
          for (const genre of this.genres) {
            this.genrebooks.push(genre["books"])
            this.num=genre["books"].length
            if (this.num !== 0) {
              this.numofbooks.push(this.num)
              this.genrenames.push(genre["genre"]);
            }
            
          }
          this.config_2= {
            type: 'doughnut',
            data: { 
              labels: this.genrenames, 
              datasets: [{data:this.numofbooks}],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            },
          };
          this.chart_2= new Chart('chart_2',this.config_2);
        }
      )
    
    this.http.get<any[]>('http://127.0.0.1:5000/books-by-author')
      .subscribe(
        response=> {
          this.authors= response 
          for (const author of this.authors) {
            this.author_names.push(author["author"])
            this.author_counts.push(author["count"])
          }

          this.config= {
            type: 'doughnut',
            data: { 
              labels: this.author_names, //x axis points
              datasets: [{data:this.author_counts}] 
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            },
          };
          this.chart= new Chart('My Chart',this.config);
        }
      )
      this.http.get<any>('http://127.0.0.1:5000/highest-rated')
      .subscribe(
        response=> {
          this.highest= response 
        }
      )
      this.http.get<any>('http://127.0.0.1:5000/lowest-rated')
      .subscribe(
        response=> {
          this.lowest= response 
        }
      )

      this.http.get<any>('http://127.0.0.1:5000/most-pages')
      .subscribe(
        response=> {
          this.mostpages= response 
        }
      )

      this.http.get<any>('http://127.0.0.1:5000/least-pages')
      .subscribe(
        response=> {
          this.leastpages= response 
        }
      )

      
  }
}
