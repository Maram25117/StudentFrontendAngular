import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';

  constructor(private router: Router) {}

  handleSignUp(event: Event): void {
    event.preventDefault();

    if (!this.username || !this.password || !this.confirmPassword) {
      this.error = 'Les champs sont vides';
      return;
    }

    if (this.username.length < 5) {
      this.error = 'Le champ nom doit être au moins de 5 caractères';
      return;
    }

    if (this.password.length < 5) {
      this.error = 'Le champ mot de passe doit être au moins de 5 caractères';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne sont pas égaux';
      return;
    }

    fetch('http://localhost:8082/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.username, password: this.password, confirmPassword: this.confirmPassword }),
    })
    .then((response: Response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then(textResponse => {
          throw new Error(textResponse);
        });
      }
    })
    .then((textResponse: string) => {
      this.router.navigate(['/login']);
    })
    .catch((error: Error) => {
      this.error = 'An error occurred: ' + error.message;
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
