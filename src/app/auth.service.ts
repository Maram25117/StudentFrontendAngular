import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkInitialLoginStatus());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {}

  private checkInitialLoginStatus(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(userId: string): void {
    localStorage.setItem('authToken', userId);
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
