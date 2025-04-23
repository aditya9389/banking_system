import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-user',
  imports: [FormsModule,CommonModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userData = {
    username: '',
    password: '',
    role: 'USER',
    phoneNumber: ''
  };
  message = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  onCreateUser(event: Event) {
    event.preventDefault(); // Prevent form submission

    console.log("----[CREATE USER] Form Submission Triggered----");


    const token = this.authService.getToken();
    if (!token) {
      console.error("----[ERROR] No authentication token found. User might not be logged in.----");
      this.message = 'Authorization token missing. Please log in again.';
      return;
    }
    console.log(`----[TOKEN RETRIEVED] Bearer ${token}----`);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("----[HEADERS SET] Authorization header added----");

    console.log("----[SENDING REQUEST] Data being sent to backend:");
    console.table(this.userData);

    this.http.post('http://localhost:8081/User/createUser', this.userData, { headers })
      .subscribe({
        next: (response) => {
          console.log("----[SUCCESS] User Created Successfully!----");
          console.log("----[RESPONSE FROM SERVER]----", response);
          this.message = 'User created successfully!';
        },
        error: (error) => {
          console.error("----[ERROR] Failed to create user!----");
          console.error("----[ERROR RESPONSE]----", error);
          this.message = 'Failed to create user. Please try again.';
        }
      });
  }
}
