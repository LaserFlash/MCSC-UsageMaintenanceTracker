import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthenticationService } from './auth/authentication.service';
import { ThemeTrackerService } from './theme/theme-tracker.service';
import { KnownBoatsService } from './constants/known-boats/known-boats.service';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: []
})
export class SharedServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedServicesModule,
      providers: [AuthenticationService, ThemeTrackerService, KnownBoatsService, CookieService]
    };
  }
}
