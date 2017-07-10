import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WYST Boat Maintenance';

  activeLinkIndex = 0;
  routeLinks = [
  { label: 'Report Usage', link: 'reportUsage' },
  { label: 'Report Breakage', link: 'report' },
  { label: 'View Breakages', link: 'reported' },
  { label: 'View Fixed', link: 'fixed' }];

}
