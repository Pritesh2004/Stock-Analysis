import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private router: Router) {}

  // Check if the JWT token exists in localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken'); // Replace 'jwtToken' with your actual token key
  }

  // Logout function to clear the token and navigate to login page
  logout(): void {
    localStorage.removeItem('jwtToken'); // Remove JWT token from localStorage
    this.router.navigate(['/login']); // Navigate to login page after logout
  }

  // Toggle mobile menu visibility
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}