import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-card',
  standalone: true,
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AdminCardComponent {
  accountId: number = 0;
  cards: any[] = [];
  searched: boolean = false;

  newCard = {
    username: '',
    accountId: 0,
    cardType: 'DEBIT',
    limitOrBalance: 0
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  fetchCards() {
    if (!this.accountId) {
      this.cards = [];
      this.searched = false;
      return;
    }

    const headers = this.getAuthHeaders();
    console.log(`[AdminCard] Fetching cards for accountId ${this.accountId}`);

    this.http.get<any[]>(`${environment.cardsApi}/card/getCardsByAccount/${this.accountId}`, { headers }).subscribe({
      next: (res) => {
        this.cards = res;
        this.searched = true;
        console.log('[AdminCard] Cards fetched:', res);
      },
      error: (err) => {
        console.error('[AdminCard] Error fetching cards:', err);
        this.cards = [];
        this.searched = true;
      }
    });
  }

  createCard() {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  const payload = {
    accountId: this.newCard.accountId,
    username: this.newCard.username,
    cardType: this.newCard.cardType,
    limitOrBalance: this.newCard.limitOrBalance
  };

  console.log('[AdminCard] Creating card with payload:', payload);

  this.http.post<any>('${environment.cardsApi}/card/createCard', payload, { headers }).subscribe({
    next: (res) => {
      console.log('[AdminCard] Card created successfully:', res);
      this.fetchCards(); // Refresh cards after creation
    },
    error: (err) => {
      console.error('[AdminCard] Error creating card:', err);
    }
  });
}


  deactivateCard(cardId: string) {
    const headers = this.getAuthHeaders();
    console.log(`[AdminCard] Deactivating card: ${cardId}`);

    this.http.put(`${environment.cardsApi}/card/deactivateCard/${cardId}`, {}, { headers }).subscribe({
      next: (res) => {
        console.log('[AdminCard] Card deactivated:', res);
        this.fetchCards(); // Refresh cards after deactivation
      },
      error: (err) => {
        console.error('[AdminCard] Error deactivating card:', err);
      }
    });
  }
}
