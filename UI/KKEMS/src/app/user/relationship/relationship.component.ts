import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_model';
import { Relationship } from 'src/app/_model/relationship';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ModalPopupService } from 'src/app/_service/modalService';
import { ApiConst } from 'src/app/_utility/ApiConst';
import { KkDialogComponent } from '../kk-dialog/kk-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogModel, DialogConfirmComponent } from 'src/app/common/dialog-confirm/dialog-confirm.component';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';
import { Group } from 'src/app/_model/group';
import { ToastrService } from 'ngx-toastr';

export interface KKElement {
  name: string;
}
@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent implements OnInit {

  relationshipForm: FormGroup;
  relationship: Relationship = new Relationship();
  isEdit: boolean;
  id: number;

  kinOrkiths = new Array<User>();
  Groups = new Array<Group>();
  Group = new Group();
  displayedColumns: string[] = ['position', 'name', 'Actions'];
  dataSource = new MatTableDataSource<User>();
  //dataSource = this.kinOrkiths;//this.relationship.kithOrKins;
  clickedRows = new Set<KKElement>();

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
    this.relationshipForm = this.formBuilder.group({
      relationshipName: [null, [Validators.required]],
      groupName: [null, [Validators.required]]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id !== 0 || (typeof this.id === "string" && this.id !== "")) {
      this.isEdit = true;
      this.getRelationshipById(this.id);
    }
  }

  openDialog() {
    let kkDialog = this.dialog.open(KkDialogComponent, {
      width: '550px'
    });
    let kinOrkith: User = new User();
    this.modalPopupService.getCloseEvent().subscribe(($e) => {
      kinOrkith = new User();
      kinOrkith.id = $e.id;
      kinOrkith.name = $e.name;

      //this.kinOrkiths = new Array<User>();
      if (this.kinOrkiths.find(x => x.id == $e.id) === undefined) {
        this.kinOrkiths.push(kinOrkith);
        this.dataSource.data = this.kinOrkiths;
      }
      console.log(this.kinOrkiths);
      this.dialog.closeAll();
    })


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

      this.relationship.groupId = group.id;
      this.relationship.group = group;

      console.log(this.relationship);
      //this.kinOrkiths = new Array<User>();
      if (this.Groups.find(x => x.id == $e.id) === undefined) {
        //this.Groups.push(group);
        this.relationshipForm.controls['groupName'].setValue(group.name);
      }
      this.dialog.closeAll();
    })


  }
  calcelGroup() {
    this.dialog.closeAll();
  }

  submit() {
    //this.relationship = new Relationship();
    if (this.relationshipForm.valid) {

      this.relationship.name = this.relationshipForm.get('relationshipName')?.value;

      //update
      if (this.isEdit) {
        this.relationship.kithOrKins = this.kinOrkiths;
        this.relationship.id = this.id;
        this.httpService.postAsync(ApiConst.updateRelationship, this.relationship).subscribe(data => {
          this.toastr.success('Saved Successfully!!', 'Congratulations...');
          this.router.navigate(["../User/relationship-list"]);
        })
      }
      //insert
      else {
        console.log('in relationship insert');
        console.log(this.relationship);
        this.httpService.postAsync(ApiConst.postRelationship, this.relationship).subscribe(data => {
          this.toastr.success('Saved Successfully!!', 'Congratulations...');
          this.router.navigate(["../User/relationship-list"]);
        })
        return;
      }
      //console.log(this.relationshipForm.value);
    }
  }



  deleteKK(id: string) {
    const message = `Are you sure you want to delete?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        const index = this.kinOrkiths.findIndex(obj => obj.id === Number(id))
        if (index > -1) {
          this.kinOrkiths.splice(index, 1);
        }
        this.dataSource.data = this.kinOrkiths;
      }
    });
  }

  edit(id: string) {

  }
  // private setUserObject() : User{
  //   this.user.EMAIL = this.relationshipForm.get('email');
  // }
  private getRelationshipById(id: number) {
    console.log('in getRelationshipById')
    this.relationship.kithOrKins = Array<User>();
    this.httpService.getAsync(ApiConst.getRelationship + id).then(data => {
      this.relationship = data;
      this.relationshipForm.controls.relationshipName.setValue(this.relationship.name);
      this.relationshipForm.controls.groupName.setValue(this.relationship.group.name);
      this.kinOrkiths = this.relationship.kithOrKins
      this.dataSource.data = this.kinOrkiths;
    })
  }

  // private getGroups() {
  //   this.httpService.getAsync(ApiConst.getGroups).then(data => {
  //     this.Groups = data;
  //   })
  // }
}

