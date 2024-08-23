import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Vérifiez si le token est présent dans le localStorage pour déterminer l'état de connexion
    const token = localStorage.getItem('authToken');
    this.isLoggedIn = !!token; // Convertit le token en booléen
  }

  handleLoginLogout(): void {
    if (this.isLoggedIn) {
      // Déconnexion
      this.isLoggedIn = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      this.router.navigate(['/']); // Redirige vers la page d'accueil ou la page de connexion
    } else {
      // Connexion (Simulation)
      const userId = '123'; // ID de l'utilisateur après authentification, peut venir d'un service d'authentification
      localStorage.setItem('authToken', 'yourToken'); // Stocke un token d'exemple
      localStorage.setItem('userId', userId); // Stocke l'ID de l'utilisateur
      this.isLoggedIn = true;
      this.router.navigate(['/']); // Redirige vers la page d'accueil ou la page souhaitée après connexion
    }
  }

  fetchUserData(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      // Assurez-vous que l'ID utilisateur est présent avant d'effectuer la requête
      this.http.post('http://localhost:8081/endpoint', {
        userId: userId,
        otherData: 'value'
      })
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error('Une erreur est survenue !', error);
      });
    } else {
      console.error('Aucun ID utilisateur trouvé dans le localStorage.');
    }
  }
}
