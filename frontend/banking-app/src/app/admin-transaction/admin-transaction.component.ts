import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-transaction',
  standalone: true,
  templateUrl: './admin-transaction.component.html',
  styleUrl: './admin-transaction.component.css',
  imports: [CommonModule, FormsModule]
})
export class AdminTransactionComponent {
  accountId: number | null = null;
  transactions: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  fetchTransactions() {
    if (!this.accountId) {
      this.errorMessage = 'Please enter a valid Account ID.';
      this.transactions = [];
      return;
    }

    const headers = this.getAuthHeaders();

    this.http.get<any[]>(`http://localhost:8082/transactions/getTransactionHistory/${this.accountId}`, { headers }).subscribe({
      next: (res) => {
        if (res.length === 0) {
          this.errorMessage = 'No transactions found for this account.';
          this.transactions = [];
        } else {
          this.transactions = res;
          this.errorMessage = '';
        }
      },
      error: (err) => {
        console.error('[AdminTransactions] Failed to fetch transactions:', err);
        this.errorMessage = 'Failed to fetch transactions. Please try again.';
        this.transactions = [];
      }
    });
  }
}
