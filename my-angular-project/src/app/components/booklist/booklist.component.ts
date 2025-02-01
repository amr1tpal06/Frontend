import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.css',
  imports: [FormsModule, RouterModule, MatButtonModule, MatToolbarModule, MatCardModule, HttpClientModule, CommonModule],
  standalone: true,
})

export class BooklistComponent implements OnInit { 
  @Input() onpage: boolean = false; 
  books: any[] = [];
  variable:any='';
  userinput:any='';
  constructor(private http: HttpClient) {}
  category:string='';
  options:any[]=[];
  encodedUserinput = encodeURIComponent(this.userinput);
  attributes:any[]=[];
  values:any[]=[];
  deletebookid:any='';
  borrowed:any[]=[];

  ngOnInit() {
    this.http.get<any[]>('http://127.0.0.1:5000/')  
      .subscribe(
        response => {
          this.books = response;
        }
      );
    this.http.get<any[]>('http://127.0.0.1:5000/borrowed')
      .subscribe(response=>{
        this.borrowed=response;
      })
    };

  filterby(category:any,encodedUserinput: any){
    this.http.get<any[]>(`http://127.0.0.1:5000/filter-by/${category}/${encodedUserinput}`)
    .subscribe((response: any[]) => {
      console.log(response);
      this.books = response; // update books array with the filtered data
      console.log('Updated books:', this.books);
    });
  }

  deletebook(deletebookid: any) {
    this.http.delete<any[]>(`http://127.0.0.1:5000/delete-book/${deletebookid}`)
      .subscribe(
        response => {
          console.log(response); 
          this.http.get<any[]>('http://127.0.0.1:5000/')
            .subscribe(
              response => {
                this.books = response; 
              }
            );
        },
        error => {
          console.error("Error deleting the book:", error);
        }
      );
  }
  
} 

//add and delete admin page
//borrow book and add rating home page
//classes
