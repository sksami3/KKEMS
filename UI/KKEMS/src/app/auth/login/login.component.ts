import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_model/user';
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
      console.log(this.user);
      //update
      if (this.user.ID !== undefined || (typeof this.user.ID === "string" && this.user.ID !== "")) {

        // this.httpService.postAsync(ApiConst.postUser, this.loginForm.value).subscribe(data => {
        //   // this.router.navigate(["/product-list"]);

        // })
      }
      //insert
      else {
        this.httpService.postAsync(ApiConst.authenticate, this.user).subscribe(data => {
          // this.router.navigate(["/product-list"]);
          console.log('saved');
        })
        return;
      }
      //console.log(this.loginForm.value);
    }
  }

  // private setUserObject() : User{
  //   this.user.EMAIL = this.loginForm.get('email');
  // }

}
