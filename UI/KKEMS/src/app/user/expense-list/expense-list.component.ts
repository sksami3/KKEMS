import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Expense } from 'src/app/_model/expense';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConst } from 'src/app/_utility/ApiConst';
import { MatTableDataSource } from '@angular/material/table';

export interface ExpenseElement {
  reason: string;
  expenseDate: Date;
}

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  expenses = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'cost', 'reason', 'kkOrGroupName', 'expenseDate', 'Action'];
  dataSource = this.expenses;
  clickedRows = new Set<ExpenseElement>();

  constructor(private httpService: HttpClientService,
    private router: Router,
    private route: ActivatedRoute) {
    this.getExpenses();
  }

  ngOnInit() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.symbol.toLowerCase().includes(filter) || data.position.toString() === filter;
    };
  }

  getExpenses() {
    this.httpService.getAsync(ApiConst.getExpenses).then(data => {
      this.expenses = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })

  }

  deleteExpense(id: string) {
    this.httpService.postAsync(ApiConst.deleteExpense + id, null).subscribe(data => {
      this.getExpenses();
    })

  }

  edit(id: string) {
    this.router.navigate(['User/expense/' + id]);
  }
  /*
      Filter
    */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
