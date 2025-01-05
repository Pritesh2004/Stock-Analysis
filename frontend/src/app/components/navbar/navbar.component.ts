import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;

  @ViewChild('header', { static: false }) headerRef: ElementRef | undefined;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Add scroll event listener when the component is initialized
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.handleScroll(); // Check scroll position initially
  }

  ngOnDestroy(): void {
    // Remove scroll event listener when the component is destroyed
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

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

  // Handle scroll event to add/remove shadow
  handleScroll(): void {
    if (this.headerRef) {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        this.renderer.addClass(this.headerRef.nativeElement, 'shadow-md');
      } else {
        this.renderer.removeClass(this.headerRef.nativeElement, 'shadow-md');
      }
    }
  }
}
