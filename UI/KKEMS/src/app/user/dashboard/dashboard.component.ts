import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { IgxCategoryChartComponent, IgxLegendComponent } from 'igniteui-angular-charts';
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

  @ViewChild('chart') chart: IgxCategoryChartComponent;
  @ViewChild('legend') legend: IgxLegendComponent;
    
  // polar
  public group_pieChartOptions: ChartOptions = {
    responsive: true,
  };
  // bar
  public kithOrkin_polarChartOptions: ChartOptions = {
    responsive: true,
  };

  public lineData: any[];


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
    //this.chart.legend = this.legend;
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
      this.kithOrkin_polarChartLabels = stat.map(x => x.name);
      this.kithOrkin_polarChartData = stat.map(x => x.total);

    })
  }

  GetMonthlyExpenseStatistics() {
    this.httpService.getAsync(ApiConst.GetMonthlyExpenseStatistics).then(data => {
      let stat: Statistics[];
      stat = data;
      this.lineData = stat;
      console.log(this.lineData);
    })
  }

}
