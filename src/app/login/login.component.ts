import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  handleLogin(event: Event): void { /*Déclaration de la fonction handleLogin qui prend un paramètre event de type Event.
     Cette fonction ne retourne pas de valeur (void).
     Cette fonction est généralement appelée lorsqu'un formulaire de connexion est soumis.*/
    event.preventDefault();
    /*Appelle la méthode preventDefault() sur l'objet event pour empêcher l'action par défaut du formulaire 
     (soumission et rechargement de la page).
     Cela permet de gérer le processus de soumission du formulaire via JavaScript.*/

    fetch('http://localhost:8082/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.username, password: this.password }),
    })
    .then(response => {
      if (response.ok) {
        return response.text(); // Assuming server returns userId or token in text
      } else {
        return response.json().then(result => {
          throw new Error(result.message || 'Login failed');
        });
      }
    })
    .then(userId => {
      this.authService.login(userId); // Pass the userId or token from server
      this.router.navigate(['/home']);
    })
    .catch(error => {
      /*La méthode catch() est appelée si une erreur se produit pendant la requête fetch (comme un problème de réseau) ou
     dans le traitement des promesses.
     Elle définit un message d'erreur générique An error occurred during login pour
     indiquer qu'une erreur est survenue pendant la tentative de connexion.*/
      this.error = 'An error occurred during login: ' + error.message;
    });
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']); //method pour passer a signup
  }
}

