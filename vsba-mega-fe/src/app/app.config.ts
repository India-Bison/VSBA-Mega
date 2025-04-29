import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideClientHydration(),
  provideAnimations(),
  provideAnimationsAsync(),
  importProvidersFrom(BrowserAnimationsModule),
  provideHttpClient(),
  provideRouter(routes),
  provideToastr({
    toastClass: 'custom-toastr',
    iconClasses: {
      success: 'custom-success-toast',
      error: 'custom-error-toast',
      info: 'custom-info-toast',
      warning: 'custom-warning-toast'
    },
    closeButton: true,
    progressBar: false,
    timeOut: 3000,
  }),  
  ]
};
