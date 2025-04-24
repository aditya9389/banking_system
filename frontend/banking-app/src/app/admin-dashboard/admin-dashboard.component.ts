import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  constructor(private router: Router, private authService:AuthService) {}

  navigateTo(path: string) {
    console.log(`Navigating to ${path}`);
    this.router.navigate([`/${path}`]);
  }
  logout(){
    console.log("Logging out and redirecting to login page");
    this.authService.removeToken(); // Clear the token from local storage
    this.router.navigate(['/login']);
    
  }
}
