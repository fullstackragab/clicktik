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
  error = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onLogin(email: string, password: string) {
    this.error = false;
    this.authService.login(email, password).subscribe({
      next: (user: any) => {
        if (user) this.router.navigateByUrl('/');
        else this.error = true;
      },
      error: (e: any) => {
        this.error = true;
      },
    });
  }
}
