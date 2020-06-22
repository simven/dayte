import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// Comme nous ne sommes pas parvenus à réalsée l'authentification,
// nous avons géré nos routes et le contenu devant apparaitre uniquement lorsque l'on est connecté dans cette classe
export class ConnectionService {

  public connected: boolean;

  // lorsque la route est '/', alors la variable 'connected' est false
  // sinon, elle est true
  constructor(private router: Router) {
    // set 'connected' to true if the route is '/' (else false)
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (this.router.url !== '/') {
          this.connected = true;
        }
      }
    });
  }

  logout() {
    this.connected = false;
    this.router.navigate(['/']);
  }

}
