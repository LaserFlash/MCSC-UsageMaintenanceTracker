import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
/**
* State managment for the applied app theme.
*   Loads saved theme from a cookie
*   Uses a BehaviorSubject to store the theme state so other components/modules\
*     can subscribe to it.
**/
export class ThemeTrackerService {
  public isDark: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private cookieService: CookieService) {
    /* Load state from Cookie*/
    this.isDark.next(this.cookieService.get('npyc') === '1');
   }

  /* Update the theme state and store in cookie */
  public setDark(b: boolean) {
    this.isDark.next(b);

    // Save in a cookie
    this.cookieService.set('npyc', (b ? 1 : 0).toString());
  }

}
