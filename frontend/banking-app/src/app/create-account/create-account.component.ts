import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true, 
  imports: [FormsModule, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  accountData = {
    balance: null,
    accountType: '',
    userId: null
  };
  message = '';

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log('[CreateAccountComponent] - Initialized');
  }

  onCreateAccount(event: Event) {
    event.preventDefault(); // Prevent default form submission behavior
    console.log('[CreateAccountComponent] - Form submitted, preparing payload');

    // ✅ Constructing payload
    const accountPayload = {
      balance: this.accountData.balance,
      accountType: this.accountData.accountType,
      user: { id: this.accountData.userId }
    };
    console.log('[CreateAccountComponent] - Payload:', accountPayload);

    // ✅ Get JWT token from AuthService
    const token = this.authService.getToken();
    console.log('[CreateAccountComponent] - Retrieved token:', token);

    if (!token) {
      console.error('[CreateAccountComponent] - No authentication token found! Redirecting to login.');
      this.message = 'Authentication failed. Please log in again.';
      return;
    }

    // ✅ Set Authorization header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('[CreateAccountComponent] - Sending API request to create account');
    this.http.post('http://localhost:8081/Account/createAccount', accountPayload, { headers })
      .subscribe({
        next: (response) => {
          console.log('[CreateAccountComponent] - Account created successfully:', response);
          this.message = 'Account created successfully!';
        },
        error: (err) => {
          console.error('[CreateAccountComponent] - Error creating account:', err);
          this.message = 'Failed to create account. Please try again.';
        }
      });
  }
}
