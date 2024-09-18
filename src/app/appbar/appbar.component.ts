import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private authSubscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Abonnez-vous à l'état de connexion
    this.authSubscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy(): void {
    // Nettoyez l'abonnement lorsque le composant est détruit
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  handleLoginLogout(): void {
    if (this.isLoggedIn) {
      this.authService.logout();
      console.log('Déconnexion réussie');
      this.router.navigate(['/']); // Redirige vers la page d'accueil ou la page de connexion
    } else {
      // Simulez une connexion
      this.authService.login('userId123'); // Remplacez par une vraie logique de connexion
      console.log('Connexion réussie');
      this.router.navigate(['/']); // Redirige vers la page d'accueil ou la page souhaitée après connexion
    }
  }
}
