import { Component } from '@angular/core';
import { ThemeTrackerService } from './theme-tracker.service'

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

  constructor(private themeTracker: ThemeTrackerService) {
    /* Apply theme at start */
    this.isDarkTheme = themeTracker.isDark;
  }

  /** Change state of dark theme, updating cookie */
  public toggleDark() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeTracker.setDark(this.isDarkTheme);
  }
}
