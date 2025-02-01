import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StatsComponent } from './components/stats/stats.component';
import { AdminComponent } from './components/admin/admin.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app.routes';
import { ActivatedRoute } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes),HttpClientTestingModule,AppComponent, StatsComponent, AdminComponent, BookComponent],  // Only RouterTestingModule should be here
      providers:
      [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {id: '2'}}
          }
        }
      ]  
    }).compileComponents();    

    router = TestBed.get(Router); 
    location = TestBed.get(Location); 
    fixture = TestBed.createComponent(AppComponent); 
    router.initialNavigation(); 
  });

  it ('navigate to "/stats" path takes you to stats page', fakeAsync(() => {
    router.navigate(['stats']);
    tick();
    expect(location.path()).toBe('/stats');
  }));

  it ('navigate to "/admin" path takes you to admin page', fakeAsync(() => {
    router.navigate(['admin']);
    tick();
    expect(location.path()).toBe('/admin');
  }));

  it ('navigate to "/home" path takes you to home page', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/');
  }));

  it ('should have the "my-angular-project" title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-angular-project');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});  

