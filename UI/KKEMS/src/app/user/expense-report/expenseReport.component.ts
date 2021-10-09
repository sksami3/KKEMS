import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
// import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_model';
import { ExpenseReport } from 'src/app/_model/expenseReport';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-expenseReport-report',
  templateUrl: './expenseReport.component.html',
  styleUrls: ['./expenseReport.component.scss']
})
export class ExpenseReportComponent implements OnInit {

  expenseReportForm: FormGroup;
  expenseReport: Array<ExpenseReport>;
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
          this.expenseReport = data;
          console.log(this.expenseReport);
          this.createPdf(this.expenseReport);
        })
    }


  }
  createPdf(expenseReport : any) {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('My Team Detail', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let col = ['expenseFor', 'cost', 'reasonOfExpense', 'whatKindOfRelation_GROUP', 'relationWithMe', 'expenseDate']; // initialization for headers

    (doc as any).autoTable({
      head: col,
      body: expenseReport,
      theme: 'plain'
      // ,
      // didDrawCell: (data: { column: { index: any; }; }) => {
      //   console.log(data.column.index)
      // }
    })

    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save('myteamdetail.pdf');
  }

  // DownloadReport(expenseReport: Array<ExpenseReport>) {
  //   let row: any[] = []
  //   let rowD: any[] = []
  //   let col = ['expenseFor', 'cost', 'reasonOfExpense', 'whatKindOfRelation_GROUP', 'relationWithMe', 'expenseDate']; // initialization for headers
  //   let title = "Expense Report" // title of report
  //   for (let a = 0; a < this.expenseReport.length; a++) {
  //     row.push(this.expenseReport[a].expenseFor)
  //     row.push(this.expenseReport[a].cost)
  //     row.push(this.expenseReport[a].reasonOfExpense)
  //     row.push(this.expenseReport[a].whatKindOfRelation_GROUP)
  //     row.push(this.expenseReport[a].relationWithMe)
  //     row.push(this.expenseReport[a].expenseDate)
  //     rowD.push(row);
  //     row = [];
  //   }
  //   this.getReport(col, rowD, title);
  // }

  // getReport(col: any[], rowD: any[], title: any) {
  //   const totalPagesExp = "{total_pages_count_string}";
  //   let pdf = new jsPDF('l', 'pt', 'legal');
  //   pdf.setTextColor(51, 156, 255);
  //   pdf.text("Sample1", 450, 40);
  //   pdf.text("Email:", 450, 60); // 450 here is x-axis and 80 is y-axis
  //   pdf.text("Phone:", 450, 80); // 450 here is x-axis and 80 is y-axis
  //   pdf.text("" + title, 435, 100);  //
  //   pdf.setLineWidth(1.5);
  //   pdf.line(5, 107, 995, 107)
  //   var pageContent = function (data: { pageCount: string; settings: { margin: { left: number; }; }; }) {
  //     // HEADER

  //     // FOOTER
  //     var str = "Page " + data.pageCount;
  //     // Total page number plugin only available in jspdf v1.0+
  //     if (typeof pdf.putTotalPages === 'function') {
  //       str = str + " of " + totalPagesExp;
  //     }
  //     pdf.setFontSize(10);
  //     var pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
  //     pdf.text(str, data.settings.margin.left, pageHeight - 10); // showing current page number
  //   };
  //   pdf.autoTable(col, rowD,
  //     {
  //       addPageContent: pageContent,
  //       margin: { top: 110 },
  //     });

  //   //for adding total number of pages // i.e 10 etc
  //   if (typeof pdf.putTotalPages === 'function') {
  //     pdf.putTotalPages(totalPagesExp);
  //   }

  //   pdf.save(title + '.pdf');
  // }
}
