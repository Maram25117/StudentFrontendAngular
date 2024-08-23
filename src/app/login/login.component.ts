import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  handleLogin(event: Event): void {
    event.preventDefault();

    fetch('http://localhost:8082/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.username, password: this.password }),
    })
    .then(response => {
      if (response.ok) {
        // Navigate to home if the response is successful
        this.router.navigate(['/home']);
      } else {
        // Attempt to parse the response as JSON
        response.json().then((result: { message: string }) => {
          this.error = result.message || 'Login failed';
        }).catch(() => {
          this.error = 'Login failed: Unable to parse error message';
        });
      }
    })
    .catch(() => {
      this.error = 'An error occurred during login';
    });
  }

  navigateToSignup(): void {   //method pour passer a signup
    this.router.navigate(['/signup']);
  }
}
