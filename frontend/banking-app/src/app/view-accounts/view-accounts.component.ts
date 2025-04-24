import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-accounts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.css']
})
export class ViewAccountsComponent {
  accountId: string = '';
  username: string = '';
  errorMessage: string = '';

  // Single account (searched by ID)
  singleAccount: any = null;

  // Multiple accounts (searched by username)
  userAccounts: any[] = [];
  totalAccounts: number = 0;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Retrieve token headers
  getTokenHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log('----[TOKEN RETRIEVED]----', token ? 'Token found.' : 'No token found!');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Search by Account ID
  searchById() {
    console.log('----[SEARCH BY ID INITIATED]----');

    this.resetResults();
    this.errorMessage = '';

    if (!this.accountId) {
      console.warn('----[WARNING] No Account ID provided.----');
      this.errorMessage = 'Please enter an Account ID.';
      return;
    }

    console.log(`----[FETCHING ACCOUNT] Account ID: ${this.accountId} ----`);

    this.http.get<any>(
      `http://localhost:8081/Account/getUserAccountBalance/${this.accountId}`,
      { headers: this.getTokenHeaders() }
    ).subscribe({
      next: (response) => {
        console.log('----[SUCCESS] Account Retrieved! ----');
        console.log('Response:', response);

        this.singleAccount = {
          accountId: this.accountId,
          accountType: response.accountType,
          balance: response.amount,
          username: response.username
        };

        console.table(this.singleAccount);
      },
      error: (err) => {
        console.error('----[ERROR] Failed to fetch account by ID. ----', err);
        this.errorMessage = 'Account not found or an error occurred.';
      }
    });
  }

  // Search by Username
  searchByUsername() {
    console.log('----[SEARCH BY USERNAME INITIATED]----');

    this.resetResults();
    this.errorMessage = '';

    if (!this.username) {
      console.warn('----[WARNING] No Username provided.----');
      this.errorMessage = 'Please enter a Username.';
      return;
    }

    console.log(`----[FETCHING ACCOUNTS] Username: ${this.username} ----`);

    this.http.get<any>(
      `http://localhost:8081/Account/getUserAccounts/${this.username}`,
      { headers: this.getTokenHeaders() }
    ).subscribe({
      next: (response) => {
        console.log('----[SUCCESS] Accounts Retrieved! ----');
        console.log('Response:', response);

        this.totalAccounts = response.totalAccounts;
        this.userAccounts = response.accounts.map((acc: any) => ({
          accountId: acc.id,
          accountType: acc.accountType,
          balance: acc.balance,
          username: this.username
        }));

        console.table(this.userAccounts);
      },
      error: (err) => {
        console.error('----[ERROR] Failed to fetch accounts by username. ----', err);
        this.errorMessage = 'User accounts not found or an error occurred.';
      }
    });
  }

  // Reset form and results
  reset() {
    console.log('----[RESETTING VIEW ACCOUNTS COMPONENT]----');
    this.accountId = '';
    this.username = '';
    this.errorMessage = '';
    this.resetResults();
  }

  // Helper to clear account data
  private resetResults() {
    this.singleAccount = null;
    this.userAccounts = [];
    this.totalAccounts = 0;
  }
}
