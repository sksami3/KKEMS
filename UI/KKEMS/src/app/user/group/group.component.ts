import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from 'src/app/_model/group';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  groupForm: FormGroup;
  group: Group;
  isEdit: boolean;
  
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService
  ) { }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      groupName: [null, [Validators.required]]
    });
  }

  submit() {
    this.group = new Group();
    if (this.groupForm.valid) {

      this.group.NAME = this.groupForm.get('groupName')?.value;
      //update
      if (this.group.ID !== undefined || (typeof this.group.ID === "string" && this.group.ID !== "")) {
        this.isEdit = true;
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

  // private setUserObject() : User{
  //   this.user.EMAIL = this.groupForm.get('email');
  // }

}
