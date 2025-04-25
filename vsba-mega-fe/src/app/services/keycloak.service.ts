import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloak: KeycloakService) { }

  async init(): Promise<void> {
    await this.keycloak.init({
      config: {
        url: 'https://keycloak.apps.thecontrast.in',
        realm: 'master',
        clientId: 'vbsa-mega-fe'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true,
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
    });

    this.keycloak.keycloakEvents$.subscribe({
      next(event) {
        console.log('Keycloak Event:', event.type);
      },
    });
  }

  get_token(): Promise<string> {
    return this.keycloak.getToken();
  }

  is_logged_in(): any {
    return this.keycloak.isLoggedIn();
  }

  logout(): void {
    this.keycloak.logout();
    localStorage.clear();
  }
}