import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_model';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';
import {UUID} from 'uuid-generator-ts';

@Component({
  selector: 'app-kithorkin',
  templateUrl: './kithorkin.component.html',
  styleUrls: ['./kithorkin.component.scss']
})
export class KithorkinComponent implements OnInit {

  user: User = new User();

  kinOrkithForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService,
  ) { }

  ngOnInit() {
    this.kinOrkithForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      name: [null, [Validators.required]],
      phonenumber: [null, [Validators.nullValidator]]
    });
  }

  submit() {
    if (this.kinOrkithForm.valid) {
      const uuid = new UUID();

      this.user = this.kinOrkithForm.value;
      this.user.PASSWORDHASH = 'kithOrkin123';
      this.user.username = uuid.getDashFreeUUID().substring(0, 6);
      this.user.isUsedForKinOrKith = true;
      console.log(this.user);
      //update
      if (this.user.id !== undefined || (typeof this.user.id === "string" && this.user.id !== "")) {

        // this.httpService.postAsync(ApiConst.postUser, this.kinOrkithForm.value).subscribe(data => {
        //   // this.router.navigate(["/product-list"]);

        // })
      }
      //insert
      else {
        this.httpService.postAsync(ApiConst.postUser, this.user).subscribe(data => {
          // this.router.navigate(["/product-list"]);
          console.log('saved');
        })
        return;
      }
      //console.log(this.kinOrkithForm.value);
    }
  }

  // private setUserObject() : User{
  //   this.user.EMAIL = this.kinOrkithForm.get('email');
  // }

}
