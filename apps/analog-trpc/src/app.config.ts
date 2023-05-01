import { provideFileRouter } from '@analogjs/router';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideTRPCClient } from './trpc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideClientHydration(),
    provideTRPCClient(),
  ],
};
