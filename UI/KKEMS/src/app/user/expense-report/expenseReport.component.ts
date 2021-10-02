import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_model';
import { ExpenseReport } from 'src/app/_model/expenseReport';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';

@Component({
  selector: 'app-expenseReport-report',
  templateUrl: './expenseReport.component.html',
  styleUrls: ['./expenseReport.component.scss']
})
export class ExpenseReportComponent implements OnInit {

  expenseReportForm: FormGroup;
  expenseReport: ExpenseReport = new ExpenseReport();
  isEdit: boolean;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.expenseReportForm = this.formBuilder.group({
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]]
    });
  }



  submit() {
    //this.expenseReport = new Relationship();
    if (this.expenseReportForm.valid) {
      //setting this for timezone issue
      let fDate = new Date(this.expenseReportForm.get('fromDate')?.value);
      let tDate = new Date(this.expenseReportForm.get('toDate')?.value);
      fDate.setDate(fDate.getDate() + 1);
      tDate.setDate(tDate.getDate() + 1);

      this.httpService.getAsync(ApiConst.GetExpenseReport 
        + "fromDate=" + fDate.toISOString() + "&toDate=" + tDate.toISOString()).then(data => {
        console.log(data);
      })
    }


  }
}
