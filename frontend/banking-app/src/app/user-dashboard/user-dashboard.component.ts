import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  transactionHistory: any[] = [];
  selectedAccountId: number | null = null;

  cardsByAccount: { [key: number]: any[] } = {};
  selectedCardAccountId: number | null = null;

  transferData = {
    fromAccountId: 0,
    toAccountId: 0,
    amount: 0
  };
  transferStatus: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username = this.authService.getUsernameFromToken();
    this.fetchAccounts();
  }

  fetchAccounts() {
    const headers = this.getAuthHeaders();
    this.http.get<any>('http://localhost:8081/Account/getMyAccounts', { headers }).subscribe({
      next: (res) => this.accounts = res.accounts,
      error: () => this.accounts = []
    });
  }

  fetchBalance(accountId: number) {
    const headers = this.getAuthHeaders();
    this.http.get<any>(`http://localhost:8081/Account/getMyAccountBalance/${accountId}`, { headers }).subscribe({
      next: (res) => this.balances[accountId] = res.amount,
      error: () => this.balances[accountId] = 'Error'
    });
  }

  TransactionHistory(accountId: number) {
    if (this.selectedAccountId === accountId) {
      this.selectedAccountId = null;
      this.transactionHistory = [];
      return;
    }

    const headers = this.getAuthHeaders();
    this.http.get<any>(`http://localhost:8082/transactions/getTransactionHistory/${accountId}`, { headers }).subscribe({
      next: (res) => {
        this.transactionHistory = res;
        this.selectedAccountId = accountId;
      },
      error: () => console.error('[UserDashboard] Transaction history fetch failed')
    });
  }

  toggleCards(accountId: number) {
    if (this.selectedCardAccountId === accountId) {
      this.selectedCardAccountId = null;
      return;
    }

    const headers = this.getAuthHeaders();
    this.http.get<any[]>(`http://localhost:8083/card/getCardsByAccount/${accountId}`, { headers }).subscribe({
      next: (res) => {
        this.cardsByAccount[accountId] = res;
        this.selectedCardAccountId = accountId;
      },
      error: () => {
        this.cardsByAccount[accountId] = [];
        this.selectedCardAccountId = accountId;
      }
    });
  }

  transferFunds() {
    this.transferStatus = 'Processing...';
    const headers = this.getAuthHeaders();

    this.http.post<any>('http://localhost:8081/Account/transferFunds', this.transferData, { headers }).subscribe({
      next: (res) => {
        this.transferStatus = res.status;

        const transactionData = {
          fromAccountId: res.fromAccountId,
          toAccountId: res.toAccountId,
          amount: res.amount,
          senderUsername: res.senderUsername,
          timestamp: res.timestamp,
          status: res.status
        };

        this.http.post<any>('http://localhost:8082/transactions/saveTransaction', transactionData, { headers })
          .subscribe({
            next: () => console.log('[UserDashboard] Transaction saved'),
            error: () => console.error('[UserDashboard] Failed to save transaction')
          });

        this.fetchAccounts();
      },
      error: () => this.transferStatus = 'Transfer Failed'
    });
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
