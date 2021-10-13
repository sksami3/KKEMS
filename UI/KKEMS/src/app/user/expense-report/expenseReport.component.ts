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
import jspdf, { jsPDF } from 'jspdf';
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
          let body = [];
          if (this.expenseReport != null) {
            for (var j = 0; j < this.expenseReport.length; j++) {
              console.log(this.expenseReport.length);
              console.log(this.expenseReport[j].expenseFor.toString());
              body.push([
                this.expenseReport[j].expenseFor.toString(),
                this.expenseReport[j].cost.toString(),
                this.expenseReport[j].reasonOfExpense.toString(),
                this.expenseReport[j].whatKindOfRelation_GROUP.toString(),
                (this.expenseReport[j].relationWithMe == null) ? '' : this.expenseReport[j].relationWithMe.toString(),
                this.expenseReport[j].expenseDate.toString()],
              );
            }
          }


          console.log(body);
          this.createPdf(body);
        })
    }
  }

  createPdf(data: any) {
    var doc = new jsPDF('p', 'mm', 'a4');;

    doc.setFontSize(5);
    doc.text('My PDF Table', 100, 80);
    doc.setFontSize(5);
    doc.setTextColor(100);

    let head = ['expenseFor', 'cost', 'reasonOfExpense', 'whatKindOfRelation_GROUP', 'relationWithMe', 'expenseDate'];

    (doc as any).autoTable({
      head: head,
      body: data,
      theme: 'plain',
      // didDrawCell: (data: { column: { index: any; }; }) => {
      //   console.log(data.column.index)
      // },
      styles: { fillColor: [255, 0, 0] },
      columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Cells in first column centered and green
      margin: { top: 10 }
    })

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // Download PDF document  
    doc.save('table.pdf');
  }

}
