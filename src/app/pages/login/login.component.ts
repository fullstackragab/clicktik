import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onLogin(email: string, password: string) {
    this.authService.login(email, password).subscribe((user: any) => {
      if (user) this.router.navigateByUrl('/');
    });
  }
}
