import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let fixture: ComponentFixture<BookComponent>;
  let component: BookComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule], 
      providers: [
        {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: (key: string) => {
                if (key === 'id') return '2'; 
                return null;
              }
            }
          }
        }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
  });

  it('should create and retrieve bookId from ActivatedRoute', fakeAsync(() => {
    fixture.detectChanges();  
    tick();  

    console.log('bookId from test:', component.bookId);  

    expect(component.bookId).toBe(2);  
  }));
});