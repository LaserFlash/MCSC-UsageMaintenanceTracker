import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeTrackerService } from './theme-tracker.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WYST';
  isDarkTheme: boolean;

  routeLinks = [
  { label: 'Report Usage', link: 'reportUsage' },
  { label: 'Report Breakage', link: 'report' },
  { label: 'View Breakages', link: 'reported' },
  { label: 'View Fixed', link: 'fixed' },
  { label: 'Safety Docs', link: 'safety' },
];

  constructor(private themeTracker: ThemeTrackerService, private router: Router) {
    /* Apply theme at start */
    this.isDarkTheme = themeTracker.isDark;
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        const element = document.getElementById('scrollId');
        element.scrollIntoView();
        window.scrollTo(0, 0)
    });
}

  /** Change state of dark theme, updating cookie */
  public toggleDark() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeTracker.setDark(this.isDarkTheme);
  }
}
