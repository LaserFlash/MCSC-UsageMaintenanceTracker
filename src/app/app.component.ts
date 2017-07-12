import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WYST Boat Maintenance';
  isDarkTheme: boolean;

  activeLinkIndex = 0;
  routeLinks = [
  { label: 'Report Usage', link: 'reportUsage' },
  { label: 'Report Breakage', link: 'report' },
  { label: 'View Breakages', link: 'reported' },
  { label: 'View Fixed', link: 'fixed' }];

  constructor(private cookieService:CookieService){
    this.isDarkTheme = this.cookieService.get('wyst') == '1';

  }

  toggleDark(){
    this.isDarkTheme = !this.isDarkTheme;
    if(this.isDarkTheme){
      this.cookieService.put('wyst', '1');
    }else {
      this.cookieService.put('wyst', '0');
    }
  }



}
