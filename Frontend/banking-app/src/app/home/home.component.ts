import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {
    console.log('[HomeComponent] - Initialized');
  }

  navigateToLogin() {
    console.log('[HomeComponent] - Login button clicked, navigating to login page');
    this.router.navigate(['/login']);
  }
}
