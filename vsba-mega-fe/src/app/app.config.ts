import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { createInterceptorCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, IncludeBearerTokenCondition, includeBearerTokenInterceptor, provideKeycloak } from 'keycloak-angular';

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  // urlPattern: /^(https:\/\/keycloak\.apps\.thecontrast\.in)(\/.*)?$/i,
  // urlPattern: /^(http:\/\/localhost\:3000)(\/.*)?$/i,
  urlPattern: /.*/,
  bearerPrefix: 'Bearer'
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideAnimations(), 
    provideAnimationsAsync(),
    provideKeycloak({
      config: {
        url: 'https://keycloak.apps.thecontrast.in',
        realm: 'master',
        clientId: 'vbsa-mega-fe'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true,
        redirectUri: window.location.href,
        silentCheckSsoRedirectUri: window.location.href + '/assets/silent-check-sso.html'
      },
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [urlCondition]
    },
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor]))
  ]
};
