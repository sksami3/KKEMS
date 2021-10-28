import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_model';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ModalPopupService } from 'src/app/_service/modalService';
import { ApiConst } from 'src/app/_utility/ApiConst';
import { KkDialogComponent } from '../kk-dialog/kk-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogModel, DialogConfirmComponent } from 'src/app/common/dialog-confirm/dialog-confirm.component';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';
import { Group } from 'src/app/_model/group';
import { Expense } from 'src/app/_model/expense';
import { RelationshipDialogComponent } from '../relationship-dialog/relationship-dialog.component';
import { Relationship } from 'src/app/_model/relationship';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export class kk {
  id: number;
  name: string;
}

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})

export class ExpenseComponent implements OnInit {

  expenseForm: FormGroup;
  expense: Expense = new Expense();
  isEdit: boolean;
  id: number;
  kinOrkiths: User[];
  kks: Array<kk>;

  filteredOptions: Observable<User[]>;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private modalPopupService: ModalPopupService,
    private authService: AuthenticationService,
    private router : Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.getKinOrKith();

    this.expenseForm = this.formBuilder.group({
      kinOrKithOrGroup: [null],
      groupName: [null],
      kinOrKith: [null],
      cost: [null, [Validators.required]],
      reason: [null, [Validators.required]],
      expenseDate: [null]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id !== 0 || (typeof this.id === "string" && this.id !== "")) {
      this.isEdit = true;
      this.getExpenseById(this.id);
    }

    if (typeof (this.kinOrkiths) !== 'undefined') {
      
      this.filteredOptions = this.expenseForm/*.get('kinOrKith')?*/.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.kinOrkiths.slice())
        );
    }
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
      this.expenseForm.controls['groupName'].setValue(group.name);
      this.expenseForm.controls.kinOrKith.setValue('');

      this.expense.kithOrKinId = 0;

      this.dialog.closeAll();
    })


  }

  calcelGroup() {
    this.dialog.closeAll();
  }

  submit() {
    //this.expense = new Relationship();
    if (this.expenseForm.valid) {
      //setting this for timezone issue
      let eDate = new Date(this.expenseForm.get('expenseDate')?.value);
      eDate.setDate(eDate.getDate() + 1);
      this.expense.cost = this.expenseForm.get('cost')?.value;
      this.expense.expenseDate = eDate;
      this.expense.reason = this.expenseForm.get('reason')?.value;

      //update
      if (this.isEdit) {
        this.expense.id = this.id;
        this.httpService.postAsync(ApiConst.updateExpense, this.expense).subscribe(data => {
          this.toastr.info('Updated Successfully!!', 'Congratulations...');
          this.router.navigate(["../User/expense-list"]);
        })
      }
      //insert
      else {
        this.httpService.postAsync(ApiConst.postExpense, this.expense).subscribe(data => {
          this.toastr.success('Saved Successfully!!', 'Congratulations...');
          this.router.navigate(["../User/expense-list"]);
        })
      }
      
    }

    
  }

  edit(id: string) {

  }

  private getExpenseById(id: number) {
    this.httpService.getAsync(ApiConst.getExpense + id).then(data => {
      this.expense = data;
      this.expenseForm.controls.cost.setValue(this.expense.cost);
      this.expenseForm.controls.kinOrKithOrGroup.setValue(this.expense.kkOrGroupName);
      this.expenseForm.controls.expenseDate.setValue(this.expense.expenseDate);
      this.expenseForm.controls.reason.setValue(this.expense.reason);
    })
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: any): User[] {
    const filterValue = this.expenseForm.get("kinOrKith")?.value;//name.toString().toLowerCase();
    console.log(name);
    return this.kinOrkiths.filter(option => option.name.toString().toLowerCase().includes(filterValue));
  }

  private getKinOrKith() {
    let id = this.authService.userValue.id;

    this.httpService.getAsync(ApiConst.getKinOrKith + id).then(data => {
      this.kinOrkiths = data;
      this.kks = this.kinOrkiths.map(o => { return { id: o.id, name: o.name } })

      this.filteredOptions = this.expenseForm.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(value => this._filter(value))
      );
    })
  }

  public getSelectedKK(kkId: any) {
    let result = this.kks.find(x => x.id == kkId);

    this.expenseForm.controls.kinOrKith.setValue(result?.name);
    this.expenseForm.controls.groupName.setValue('');

    this.expense.groupId = 0;
    this.expense.kithOrKinId = result?.id;

    this.modalPopupService.emit(result);
  }
}

