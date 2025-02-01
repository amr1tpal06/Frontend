import { Component } from '@angular/core';
import { BooklistComponent } from '../booklist/booklist.component';
import { HttpClient } from '@angular/common/http';
import {  CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [BooklistComponent, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private http: HttpClient) {}
  @Output() onadminpage = new EventEmitter();

  deletebookid:any='';

  deletebook(deletebookid: any) {
    this.http.delete<any[]>(`http://127.0.0.1:5000/delete-book/${deletebookid}`)
      .subscribe(
        response => {
          console.log(response); 
        },
        error => {
          console.error("Error deleting the book:", error);
        }
      );
  }
}
