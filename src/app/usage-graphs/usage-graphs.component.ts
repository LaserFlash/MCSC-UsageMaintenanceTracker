import { Component } from '@angular/core';
import { BoatUsageService } from '../boat-usage.service'
import { UsageInfo } from '../objects/usageInfo';
import { UserFriendlyBoats } from '../Utils/menuNames'


@Component({
  selector: 'app-usage-graphs',
  templateUrl: './usage-graphs.component.html',
  styleUrls: ['./usage-graphs.component.css']
})
export class UsageGraphsComponent {
  public barChartData:any[] = [{data:[0,0,0,0,0,0,0,0],label:'Hours Used'}];

  constructor(private boatUsageService: BoatUsageService){
    boatUsageService.items.subscribe(()=>{
      this.barChartData = [{data:this.boatUsageService.usageTimes, label:'Hours Used'}];
    })
  }

  public colors:Array<any> = [{ // first color
      backgroundColor: 'rgba(66,165,245,1)',
      borderColor: 'rgba(225,10,241)',
      pointBackgroundColor: 'rgba(66,165,245,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(66,165,245,1)'
    }];

  public barChartOptions:any = {
     scaleShowVerticalLines: false,
     responsive: true,
     maintainAspectRatio: true,
   };
   public barChartLabels:string[] = UserFriendlyBoats;
   public barChartType:string = 'bar';
   public barChartLegend:boolean = true;
}
