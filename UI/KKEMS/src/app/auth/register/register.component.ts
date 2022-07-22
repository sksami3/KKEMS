import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { min } from 'rxjs/operators';
import { User } from 'src/app/_model/user';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  registrationForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService,
    private router : Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      username: [null, [Validators.required]],
      passwordhash: [null, [Validators.required, Validators.minLength(6)]],
      phonenumber: [null, [Validators.nullValidator]]
    });
  }

  submit() {
    if (this.registrationForm.valid) {

      this.user = this.registrationForm.value;
      this.user.isUsedForKinOrKith = false;
      console.log(this.user);
      //update
      if (this.user.id !== undefined || (typeof this.user.id === "string" && this.user.id !== "")) {

        // this.httpService.postAsync(ApiConst.postUser, this.registrationForm.value).subscribe(data => {
        //   // this.router.navigate(["/product-list"]);

        // })
      }
      //insert
      else {
        this.httpService.postAsync(ApiConst.postUser, this.user).subscribe(data => {
          // this.router.navigate(["/product-list"]);
          this.toastr.success('Registration Done', 'Success!!!');
        })
      }
      this.router.navigate(["../User/login"]);
    }
  }

  // private setUserObject() : User{
  //   this.user.EMAIL = this.registrationForm.get('email');
  // }
}
