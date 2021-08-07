import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/_model/group';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';
import { KkDialogComponent } from '../kk-dialog/kk-dialog.component';

export interface KKElement {
  name: string;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent implements OnInit {

  groupForm: FormGroup;
  group: Group = new Group();
  isEdit: boolean;

  kinOrkiths = [];
  displayedColumns: string[] = ['position', 'name', 'Actions'];
  dataSource = this.group.kithOrKins;
  clickedRows = new Set<KKElement>();

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  openDialog() {
    this.dialog.open(KkDialogComponent, {
      width: '550px'
    });
  }
  calcel(){
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      groupName: [null, [Validators.required]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id !== undefined || (typeof id === "string" && id !== "")) {
      this.isEdit = true;
      this.getGroupById(Number(id));
    }
  }

  submit() {
    this.group = new Group();
    if (this.groupForm.valid) {

      this.group.name = this.groupForm.get('groupName')?.value;
      //update
      if (this.isEdit) {
        // this.httpService.postAsync(ApiConst.postUser, this.groupForm.value).subscribe(data => {
        //   // this.router.navigate(["/product-list"]);

        // })
      }
      //insert
      else {
        this.httpService.postAsync(ApiConst.postGroup, this.group).subscribe(data => {
          // this.router.navigate(["/product-list"]);
          console.log('saved');
        })
        return;
      }
      //console.log(this.groupForm.value);
    }
  }

  deleteKK(id: string) {

  }

  edit(id: string) {
    
  }
  // private setUserObject() : User{
  //   this.user.EMAIL = this.groupForm.get('email');
  // }
  private getGroupById(id : number) {
    console.log('in getGroupById')
    this.httpService.getAsync(ApiConst.getGroup + id).then(data => {
      this.group = data;
      console.log(this.group);
      this.groupForm.controls.groupName.setValue(this.group.name);
      this.dataSource = this.group.kithOrKins;
    })
  }
}
