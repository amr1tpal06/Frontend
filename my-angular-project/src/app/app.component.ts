import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ FormsModule, RouterModule, MatButtonModule, MatToolbarModule, MatCardModule, HttpClientModule, CommonModule],
  standalone: true,
})

export class AppComponent implements OnInit { 
  variable:any='';
  variable_2:any='';
  title = 'my-angular-project';
  books: any[] = [];
  headertitle:string = 'title';
  isHovered=false;
  bookitem:any= '';
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://127.0.0.1:5000/')  
      .subscribe(
        response => {
          this.books = response;
        }
      );
  }

  getbook(bookId: number) {
    this.http.get('http://127.0.0.1:5000/'+bookId)
      .subscribe( response => {
        this.bookitem=response;
      })
  }

  filterby(variable:any, thing:any){
    this.http.get<any>('http://127.0.0.1:5000/filter-by'+variable+thing)
      .subscribe(response => {
        this.books=response;
      })
  }
}

//learn the code, plan application and the implement 
//make app and document 


/*get(url): Fetches data from a server.
post(url, body): Sends data to a server.
put(url, body): Updates data on the server.
delete(url): Deletes data on the server.*/