import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-users',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {
  users: any[] = [];
  selectedUser: any = null;
  searchTerm: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.getUsers(); // Get all users initially
  }

  // Fetch all users (getUsers API)
  getUsers() {
    const token = this.authService.getToken();
    if (!token) {
      this.errorMessage = 'Authorization token missing. Please log in again.';
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:8081/User/getUsers', { headers }).subscribe({
      next: (response) => {
        this.users = response; // Assigning the full list of users
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Failed to fetch users. Please try again later.';
      }
    });
  }

  // Handle the search functionality
  onSearch() {
    if (this.searchTerm) {
      this.users = this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.getUsers(); // If search is cleared, fetch all users again
    }
  }

  // Fetch the details of a specific user
  getUserDetails(username: string) {
    const token = this.authService.getToken();
    if (!token) {
      this.errorMessage = 'Authorization token missing. Please log in again.';
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(`http://localhost:8081/User/getUser/${username}`, { headers }).subscribe({
      next: (response) => {
        this.selectedUser = response; // Show selected user details
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
        this.errorMessage = 'Failed to fetch user details. Please try again later.';
      }
    });
  }

  // Reset the selected user
  resetSelection() {
    this.selectedUser = null;
    this.searchTerm = '';
    this.getUsers(); // Reload all users
  }
}
