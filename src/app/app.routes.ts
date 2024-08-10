import { Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  { path: 'cart', redirectTo: 'orders', pathMatch: 'prefix' },
  { path: 'orders', component: OrdersComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
];
