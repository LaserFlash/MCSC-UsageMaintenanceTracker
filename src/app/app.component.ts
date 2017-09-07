import { Component } from '@angular/core';
import { CookieService, CookieOptions } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WYST';
  isDarkTheme: boolean;

  routeLinks = [
  { label: 'Report Usage', link: 'reportUsage' },
  { label: 'Report Breakage', link: 'report' },
  { label: 'View Breakages', link: 'reported' },
  { label: 'View Fixed', link: 'fixed' },
  { label: 'Safety Docs', link: 'safety' },
];

  constructor(private cookieService:CookieService){
    /* Apply theme at start */
    this.isDarkTheme = this.cookieService.get('wyst') == '1';
  }

  /** Change state of dark theme, updating cookie */
  public toggleDark(){
    this.isDarkTheme = !this.isDarkTheme;
    var cookieOptions :CookieOptions = { expires: new Date(32525112147000)}
    if(this.isDarkTheme){
      this.cookieService.put('wyst', '1', cookieOptions);
    }else {
      this.cookieService.put('wyst', '0', cookieOptions);
    }
  }
}
