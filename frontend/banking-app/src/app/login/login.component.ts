import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    console.log('[LoginComponent] - Initialized');
  }

  onLogin(event: Event) {
    event.preventDefault();
    console.log(`[LoginComponent] - Attempting login with username: ${this.loginData.username}`);

    this.http.post<{ token: string, role: string }>('http://localhost:8081/User/userLogin', this.loginData).subscribe({
      next: (response) => {
        console.log('[LoginComponent] - Login successful, received token:', response.token);
        this.authService.saveToken(response.token);

        if (response.role === 'ADMIN') {
          console.log('[LoginComponent] - Admin role detected, redirecting to admin dashboard');
          this.router.navigate(['/admin-dashboard']);
        } else {
          console.log('[LoginComponent] - User role detected, redirecting to user dashboard');
          this.router.navigate(['/user-dashboard']);
        }
      },
      error: (err) => {
        console.error('[LoginComponent] - Login failed:', err);
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
