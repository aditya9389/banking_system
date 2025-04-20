import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'RandomToken';  // Key to store the token in local storage
  constructor(private http:HttpClient) {}

  saveToken(token: string): void {
    if(typeof window !== 'undefined' && window.localStorage)
    localStorage.setItem(this.tokenKey, token);  
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(this.tokenKey);
      }
      return null;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Function to attach token to requests
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
