import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ThemeTrackerService {
  public isDark: boolean;
  constructor(private cookieService: CookieService) {
    this.isDark = this.cookieService.get('mcsc') === '1';
   }

  public setDark(b: boolean) {
    this.isDark = b;
    this.cookieService.set('mcsc', (b ? 1 : 0).toString());
  }

}
