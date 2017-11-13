import { Component } from '@angular/core';
import { BoatUsageService } from '../boat-usage.service'
import { UsageInfo } from '../objects/usageInfo';
import { Boats, UserFriendlyBoats } from '../Utils/menuNames'


@Component({
  selector: 'app-usage-graphs',
  templateUrl: './usage-graphs.component.html',
  styleUrls: ['./usage-graphs.component.css']
})
export class UsageGraphsComponent {
  public chartData: any[] = [{ data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Hours Used' }];

  constructor(private boatUsageService: BoatUsageService) {
    boatUsageService.items.subscribe(() => {
      this.chartData = [{ data: this.boatUsageService.usageTimes, label: 'Hours Used' }];
    })
  }

  public colors: Array<any> = [{
    backgroundColor: 'rgba(66,165,245,1)',
    borderColor: 'rgba(225,10,241)',
    pointBackgroundColor: 'rgba(66,165,245,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(66,165,245,1)'
  }];

  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
  };

  //Only use boat data for boats with a userfriendly name
  public chartLabels: string[] = UserFriendlyBoats.filter((s, i) => {
    let yes: boolean = false;
    Boats.forEach(j => {
      yes ? true : yes = i == j;
    })
    return yes;
  });

  public chartType: string = 'bar';
  public chartLegend: boolean = true;
}
