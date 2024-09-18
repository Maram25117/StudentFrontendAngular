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

    fetch('http://localhost:8082/user/register', { //pour le signup et signin on utilise fetch
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.username, password: this.password, confirmPassword: this.confirmPassword }),
    })
    .then((response: Response) => {
      if (response.ok) {
        /*Si oui, elle retourne le texte de la réponse
         (c'est-à-dire, le contenu du corps de la réponse) en appelant response.text().*/
        return response.text();
      } else {
        /*Si la réponse n'est pas réussie (code de statut hors de la plage 200-299), 
        elle retourne le texte de la réponse et lève une exception avec un message d'erreur.
        throw new Error(textResponse) crée une nouvelle erreur avec le texte de la réponse comme message.*/
        return response.text().then(textResponse => {
          throw new Error(textResponse);
        });
      }
    })
        /*Si la requête et la réponse sont réussies, la méthode .then() suivante est appelée.
         textResponse: string représente le texte de la réponse du serveur.
         Après une inscription réussie, l'utilisateur est redirigé vers la page de connexion ('/login') 
         en utilisant le routeur Angular avec this.router.navigate(['/login']).*/
    .then((textResponse: string) => {
      this.router.navigate(['/login']);
    })
    /*La méthode .catch() est utilisée pour gérer les erreurs qui se produisent soit lors de l'exécution de la requête HTTP,
      soit lors du traitement de la réponse.
      En cas d'erreur, le message d'erreur est stocké dans this.error pour être affiché à l'utilisateur.*/
    .catch((error: Error) => {
      this.error = 'An error occurred: ' + error.message;
    });
  } //fin de handle signup

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
