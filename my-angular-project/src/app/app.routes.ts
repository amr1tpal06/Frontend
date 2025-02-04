import { Routes } from '@angular/router';
import { BooklistComponent } from './components/booklist/booklist.component';
import { BookComponent } from './components/book/book.component';
import { AdminComponent } from './components/admin/admin.component';
import { StatsComponent } from './components/stats/stats.component';

export const routes: Routes = [
   {path: '', component: BooklistComponent },
   {path: 'book/:id', component: BookComponent},
   {path:'admin', component:AdminComponent},
   {path: 'stats', component: StatsComponent },
];