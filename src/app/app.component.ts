import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeTrackerService } from './theme-tracker.service'

import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MatIconRegistry]
})
export class AppComponent implements OnInit {
  title = 'WYST';
  isDarkTheme: boolean;

  routeLinks = [
  { label: 'Report', link: 'report'},
  { label: 'View', link: 'view'},
  { label: 'Stats', link: 'stats'},
  { label: 'Docs', link: 'docs'},
];

  constructor(private themeTracker: ThemeTrackerService, private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    /* Apply theme at start */
    this.isDarkTheme = themeTracker.isDark;

    iconRegistry.addSvgIcon('docs',
                  sanitizer.bypassSecurityTrustResourceUrl('assets/images/file-document.svg'))
                .addSvgIcon('report',
                  sanitizer.bypassSecurityTrustResourceUrl('assets/images/clipboard-outline.svg'))
                .addSvgIcon('stats',
                  sanitizer.bypassSecurityTrustResourceUrl('assets/images/poll.svg'))
                .addSvgIcon('view',
                  sanitizer.bypassSecurityTrustResourceUrl('assets/images/view-stream.svg'));

  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      const element = document.getElementById('scrollId');
      setTimeout(function() {
      element.scrollIntoView();
      window.scrollTo(0, 0);
      }, 500);
    });
}

  /** Change state of dark theme, updating cookie */
  public toggleDark() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeTracker.setDark(this.isDarkTheme);
  }
}
