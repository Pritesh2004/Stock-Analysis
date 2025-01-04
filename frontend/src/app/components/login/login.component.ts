import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';


interface JwtRequest {
  email: string;
  password: string;
}

interface JwtResponse {
  token: string;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule, FormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080/generate-token';


  login(jwtRequest: JwtRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.apiUrl, jwtRequest);
  }
  onSubmit(): void {
    const jwtRequest = {
      email: this.email,
      password: this.password
    };

    this.login(jwtRequest).subscribe(
      (response) => {
        this.saveToken(response.token); // Save JWT in localStorage
        this.router.navigate(['/']); // Redirect to the home page after login
      },
      (error) => {
        console.error('Error during login:', error);
        this.message = 'Login failed: ' + error.error; // Show error message
      }
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }


}
