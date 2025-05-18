import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  imports: [FormsModule, CommonModule]
})
export class UserDashboardComponent {
  username: string = '';
  accounts: any[] = [];
  balances: { [key: number]: string } = {};
  transferData = {
    fromAccountId: 0,
    toAccountId: 0,
    amount: 0
  };
  transferStatus: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.username = this.authService.getUsernameFromToken();
    console.log('[UserDashboard] Logged in as:', this.username);
    this.fetchAccounts();
  }

  fetchAccounts() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    this.http.get<any>('http://localhost:8081/Account/getMyAccounts', { headers }).subscribe({
      next: (res) => {
        this.accounts = res.accounts;
        console.log('[UserDashboard] Accounts fetched:', this.accounts);
      },
      error: (err) => {
        console.error('[UserDashboard] Failed to fetch accounts:', err);
        this.accounts = [];
      }
    });
  }

  fetchBalance(accountId: number) {
    console.log(`[UserDashboard] Fetching balance for account ID: ${accountId}`);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    this.http.get<any>(`http://localhost:8081/Account/getMyAccountBalance/${accountId}`, { headers }).subscribe({
      next: (res) => {
        this.balances[accountId] = res.amount;
        console.log(`[UserDashboard] Balance for account ${accountId}: ${res.amount}`);
      },
      error: (err) => {
        console.error(`[UserDashboard] Failed to fetch balance for account ${accountId}`, err);
        this.balances[accountId] = 'Error';
      }
    });
  }

  transferFunds() {
    this.transferStatus = 'Processing...';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    console.log('[UserDashboard] Initiating transfer:', this.transferData);

    this.http.post<any>('http://localhost:8081/Account/transferFunds', this.transferData, { headers }).subscribe({
      next: (res) => {
        this.transferStatus = res.status;
        console.log('[UserDashboard] Transfer success:', res);

        const transactionData = {
          fromAccountId: res.fromAccountId,
          toAccountId: res.toAccountId,
          amount: res.amount,
          senderUsername: res.senderUsername,
          timestamp: res.timestamp,
          status: res.status
        };

        console.log('[UserDashboard] Sending transaction to Transaction Microservice:', transactionData);

        this.http.post<any>('http://localhost:8082/transactions/saveTransaction', transactionData, { headers })
          .subscribe({
            next: (response) => {
              console.log('[UserDashboard] Transaction save response:', response.message);
            },
            error: (error) => {
              console.error('[UserDashboard] Error saving transaction:', error.message);
            }
          });

        this.fetchAccounts(); // Refresh account data
      },
      error: (err) => {
        this.transferStatus = 'Transfer Failed';
        console.error('[UserDashboard] Transfer failed:', err);
      }
    });
  }

  transactionHistory: any[] = [];
  selectedAccountId: number | null = null;

  TransactionHistory(accountId: number) {
    if (this.selectedAccountId === accountId) {
      // If the same account is clicked again, hide the transactions
      this.selectedAccountId = null;
      this.transactionHistory = [];
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    this.http.get<any>(`http://localhost:8082/transactions/getTransactionHistory/${accountId}`, { headers })
      .subscribe({
        next: (res) => {
          console.log('[UserDashboard] Transaction history:', res);
          this.transactionHistory = res;
          this.selectedAccountId = accountId;
        },
        error: (err) => {
          console.error('[UserDashboard] Failed to fetch transaction history:', err);
        }
      });
  }


  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

}
