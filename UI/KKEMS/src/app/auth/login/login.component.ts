import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_model/user';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  loginForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService,
    private httpAuthService: AuthenticationService,
    private router : Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      passwordhash: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  submit() {
    if (this.loginForm.valid) {

      this.user = this.loginForm.value;
      //update
      if (this.user.id !== undefined || (typeof this.user.id === "string" && this.user.id !== "")) {

      }
      //insert
      else {
        this.httpAuthService.login(this.loginForm.get('username')?.value, this.loginForm.get('passwordhash')?.value).subscribe(data => {
          console.log('saved');
        })
      }
      this.router.navigate([""]);
    }
  }

  // private setUserObject() : User{
  //   this.user.EMAIL = this.loginForm.get('email');
  // }

}
