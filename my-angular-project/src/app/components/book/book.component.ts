import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Input} from '@angular/core';

@Component({
  selector: 'app-book',
  imports: [HttpClientModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  bookitem:any= '';
  bookId:number=0;
  borrowed:any=null;
  @Input() onadminpage: boolean = false;
  rating:number=0;
  authorinfo:any=null;

  getbook(){
    this.http.get('http://127.0.0.1:5000/'+this.bookId)
      .subscribe( response => {
        this.bookitem=response;
      })

  }

  showauthor() {
    this.http.get('http://127.0.0.1:5000/show-author'+this.bookId)
      .subscribe( response => {
        this.authorinfo= response; 
      })
  }
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  ngOnInit(): void {
    // get id using activated route (paramap) 
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.getbook();
  }
  
  borrowbook() {
    this.http.patch(`http://127.0.0.1:5000/borrow-book/${this.bookId}`, {}) 
      .subscribe(
        (response) => {
          this.getbook();
        }
      );
  }

  returnbook(){
    this.http.patch(`http://127.0.0.1:5000/return-book/${this.bookId}`, {})
    .subscribe(
      (response) => {
        this.getbook();
      }
    );
  }

  ratebook(){
    this.http.patch(`http://127.0.0.1:5000/rate-book/${this.bookId}`, this.rating)
      .subscribe(
        (response) => {
          this.getbook();
        }
      );
    }
}
