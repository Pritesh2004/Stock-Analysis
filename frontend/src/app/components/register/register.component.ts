import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent {
  user: User = { name: '', email: '', password: '' };
  message: string = '';

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    this.http.post<string>('http://localhost:8080/user', this.user).subscribe(
      (response) => {
        this.message = `User created successfully: ${response}`;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
