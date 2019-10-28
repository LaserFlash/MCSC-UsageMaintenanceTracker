import { Component, Input, OnInit } from '@angular/core';


import { BoatUsageService } from '../../../../shared/providers/boat-usage.service';
import { KnownBoatsService } from '../../../../../core/constants/known-boats/known-boats.service';
import { UsageInfo } from '../../../../../core/objects/usageInfo';

@Component({
  selector: 'usage-graphs',
  templateUrl: './usage-graphs.component.html',
  styleUrls: ['./usage-graphs.component.css']
})
export class UsageGraphsComponent implements OnInit {
  @Input() dataLabel: string;
  @Input() chartTitle: string;

  chartData: any[] = [{ data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Hours Used' }];
  colors: Array<any> = [{
    backgroundColor: 'rgba(66,165,245,1)',
    borderColor: 'rgba(225,10,241)',
    pointBackgroundColor: 'rgba(66,165,245,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(66,165,245,1)'
  }];

  chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
  };

  // Only use boat data for boats with a userfriendly name
  chartLabels: string[];

  public chartType = 'bar';
  public chartLegend = true;

  usageLastMonth: { boat: string, duration: number }[];

  constructor(
    private usageService: BoatUsageService,
    private BOATS: KnownBoatsService
  ) { }

  ngOnInit() {

    this.usageService.lastMonthEachBoat.subscribe(usages => {
      this.usageLastMonth = usages;
    });

    this.usageService.usageTimes.subscribe((data) => {
      const builtLabelList = [];
      const builtDataList = [];
      Object.keys(data).forEach(key => {
        builtDataList.push(data[key].duration);
        builtLabelList.push(this.BOATS.getBoatName(data[key].boat));
      });
      this.chartData[0].data = builtDataList;
      this.chartLabels = builtLabelList;
    });

  }

  private getBoatName(v) {
    return this.BOATS.getBoatName(v);
  }

  private shortDuration(duration) {
    return Number.parseFloat(duration).toPrecision(2).toString();
  }

}
