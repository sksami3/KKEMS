import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router : Router,
    private toastr: ToastrService
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
        this.httpAuthService.login(this.loginForm.get('username')?.value, this.loginForm.get('passwordhash')?.value).subscribe(data => {
          if(data.id != 0 || data.id != null){
            this.router.navigate([""]);
          }
          else{
            this.toastr.error('Plese check your credential', 'Login Error!!!');
          }
        })
    }
  }

  // private setUserObject() : User{
  //   this.user.EMAIL = this.loginForm.get('email');
  // }

}
