import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Statistics } from 'src/app/_model/statistics';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // polar
  public group_pieChartOptions: ChartOptions = {
    responsive: true,
  };
  // bar
  public kithOrkin_polarChartOptions: ChartOptions = {
    responsive: true,
  };

  //line
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  public group_pieChartLabels: Label[];
  public group_pieChartData: SingleDataSet;
  public group_pieChartType: ChartType = 'pie';
  public group_pieChartLegend = true;
  public group_pieChartPlugins = [];

  public kithOrkin_polarChartLabels: Label[];
  public kithOrkin_polarChartData: SingleDataSet;
  public kithOrkin_polarChartType: ChartType = 'polarArea';
  public kithOrkin_polarChartLegend = true;
  //public kithOrkin_polarChartPlugins = [];

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[] = [];
  
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType : ChartType ='line';
  public lineChartPlugins = [];

  constructor(private httpService: HttpClientService,
    private router: Router,
    private route: ActivatedRoute) {
    this.getGroupExpense();
    this. getKithOrKinExpense();
    this.GetMonthlyExpenseStatistics();
    //monkeyPatchChartJsTooltip();
    //monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {

  }

  getGroupExpense() {
    this.httpService.getAsync(ApiConst.groupExpenseStatistics).then(data => {
      let stat: Statistics[];
      stat = data;
      this.group_pieChartLabels = stat.map(x => x.name);
      this.group_pieChartData = stat.map(x => x.total);

    })
  }

  getKithOrKinExpense() {
    this.httpService.getAsync(ApiConst.kithOrKinExpenseStatistics).then(data => {
      let stat: Statistics[];
      stat = data;
      console.log(stat);
      this.kithOrkin_polarChartLabels = stat.map(x => x.name);
      this.kithOrkin_polarChartData = stat.map(x => x.total);

    })
  }

  GetMonthlyExpenseStatistics() {
    this.httpService.getAsync(ApiConst.GetMonthlyExpenseStatistics).then(data => {
      let stat: Statistics[];
      stat = data;
      console.log(stat);
      this.lineChartLabels = stat.map(x => x.name);
      // var obj = {
      //   name : stat.map(x => x.name),
      //   list : stat.map(x => x.total)
      // }
      // this.lineChartData = stat.map(x => x.total);

    })
  }

}
