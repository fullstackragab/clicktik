import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: any = undefined;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
}
