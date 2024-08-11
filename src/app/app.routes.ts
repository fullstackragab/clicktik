import { Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  { path: 'cart', redirectTo: 'orders', pathMatch: 'prefix' },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
];
