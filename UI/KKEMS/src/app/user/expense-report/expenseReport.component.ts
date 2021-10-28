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
import { Expense } from 'src/app/_model/expense';
import { kk } from '../kk-dialog/kk-dialog.component';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';
import { Group } from 'src/app/_model/group';
import { ModalPopupService } from 'src/app/_service/modalService';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
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

  expense: Expense = new Expense();
  kinOrkiths: User[];
  kks: Array<kk>;
  filteredOptions: Observable<User[]>;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private modalPopupService: ModalPopupService
  ) { }

  ngOnInit() {
    this.expenseReportForm = this.formBuilder.group({
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
      kinOrKithOrGroup: [null],
      groupName: [null],
      kinOrKith: [null]
    });

    this.getKinOrKith();

    if (typeof (this.kinOrkiths) !== 'undefined') {
      this.filteredOptions = this.expenseReportForm.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.kinOrkiths.slice())
        );
    }

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
        + "fromDate=" + fDate.toISOString() 
        + "&toDate=" + tDate.toISOString()
        + "&groupId=" + this.expense.groupId
        + "&kithOrKinId=" + this.expense.kithOrKinId
        ).then(data => {
          this.expenseReport = data;
          console.log(this.expenseReport);
          let body = [];
          if (this.expenseReport != null) {
            for (var j = 0; j < this.expenseReport.length; j++) {
              body.push([
                this.expenseReport[j].expenseFor.toString(),
                this.expenseReport[j].cost.toString(),
                this.expenseReport[j].reasonOfExpense.toString(),
                this.expenseReport[j].whatKindOfRelation_GROUP.toString(),
                (this.expenseReport[j].relationWithYou == null) ? '' : this.expenseReport[j].relationWithYou.toString(),
                new Date(this.expenseReport[j].expenseDate).toDateString().toString()],
              );
            }

            var total = this.expenseReport.reduce((sum, el) => sum + el.cost, 0);
            console.log(total);
          }
          this.createPdf(body);
        })
    }
  }

  createPdf(data: any) {
    var doc = new jsPDF('p', 'mm', 'a4');;

    doc.setFontSize(5);
    doc.setFontSize(5);
    doc.setTextColor(100);

    let head = [['Expense For', 'Cost', 'Reason Of Expense', 'Relation Type', 'Rel. With Me', 'Expense Date']];

    (doc as any).autoTable({
      head: head,
      body: data,
      theme: 'grid',
      margin: { top: 30 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 15 },
        2: { cellWidth: 50 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 35 },
        // etc
      },
      showHead: "everyPage",
      didDrawPage: function (data: { settings: { margin: { left: number; }; }; }) {

        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text("Expense Report", data.settings.margin.left, 22);
      }
    })

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')


    // Download PDF document  
    doc.save('expenseReport_' + new Date().toString() + '.pdf');
  }
  
  calcel() {
    this.dialog.closeAll();
  }

  openGroupDialog() {
    let groupDialog = this.dialog.open(GroupDialogComponent, {
      width: '550px'
    });
    let group: Group = new Group();
    this.modalPopupService.getCloseEvent().subscribe(($e) => {
      group = new Group();
      group.id = $e.id;
      group.name = $e.name;

      this.expense.groupId = group.id;
      this.expenseReportForm.controls['groupName'].setValue(group.name);
      this.expenseReportForm.controls.kinOrKith.setValue('');

      this.expense.kithOrKinId = 0;

      this.dialog.closeAll();
    })


  }

  calcelGroup() {
    this.dialog.closeAll();
  }


  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toString().toLowerCase();

    return this.kinOrkiths.filter(option => option.name.toString().toLowerCase().includes(filterValue));
  }

  private getKinOrKith() {
    let id = this.authService.userValue.id;

    this.httpService.getAsync(ApiConst.getKinOrKith + id).then(data => {
      this.kinOrkiths = data;
      this.kks = this.kinOrkiths.map(o => { return { id: o.id, name: o.name } })

      this.filteredOptions = this.expenseReportForm.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
  }

  public getSelectedKK(kkId: any) {
    let result = this.kks.find(x => x.id == kkId);

    this.expenseReportForm.controls.kinOrKith.setValue(result?.name);
    this.expenseReportForm.controls.groupName.setValue('');

    this.expense.groupId = 0;
    this.expense.kithOrKinId = result?.id;

    this.modalPopupService.emit(result);
  }
}
