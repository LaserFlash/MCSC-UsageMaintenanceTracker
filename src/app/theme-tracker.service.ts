import { Injectable } from '@angular/core';
import { CookieService, CookieOptions } from 'ngx-cookie';

@Injectable()
export class ThemeTrackerService {
  public isDark: boolean;
  constructor(private cookieService: CookieService) {
    this.isDark = this.cookieService.get('NPYC') === '1';
   }

  public setDark(b: boolean) {
    this.isDark = b;
    const cookieOptions: CookieOptions = { expires: new Date(32525112147000)};
    this.cookieService.put('NPYC', (b ? 1 : 0).toString(), cookieOptions);
  }

}
