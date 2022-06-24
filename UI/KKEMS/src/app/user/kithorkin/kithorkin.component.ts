import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_model';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';
import { UUID } from 'uuid-generator-ts';

@Component({
  selector: 'app-kithorkin',
  templateUrl: './kithorkin.component.html',
  styleUrls: ['./kithorkin.component.scss']
})
export class KithorkinComponent implements OnInit {

  user: User = new User();

  kinOrkithForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.kinOrkithForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      name: [null, [Validators.required]],
      phonenumber: [null]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id !== 0 || (typeof this.id === "string" && this.id !== "")) {
      this.getKKById(this.id);
    }
  }

  submit() {
    if (this.kinOrkithForm.valid) {
      const uuid = new UUID();

      this.user = this.kinOrkithForm.value;
      console.log(this.user);
      console.log(this.id);
      //update
      if (this.id !== undefined && this.id !== null && this.id !== 0) {
        this.user.id = this.id;
        this.httpService.postAsync(ApiConst.updateKinOrKith, this.user).subscribe(data => {
          this.toastr.info('Updated Successfully!!', 'Congratulations...');
          this.router.navigate(["../User/kithorkin-list"]);
        })
      }
      //insert
      else {
        this.user.PASSWORDHASH = 'kithOrkin123';
        this.user.username = uuid.getDashFreeUUID().substring(0, 6);
        this.user.isUsedForKinOrKith = true;

        this.httpService.postAsync(ApiConst.postUser, this.user).subscribe(data => {
          this.toastr.success('Saved Successfully!!', 'Congratulations...');
          this.router.navigate(["../User/kithorkin-list"]);
        })
      }

    }
  }

  // private setUserObject() : User{
  //   this.user.EMAIL = this.kinOrkithForm.get('email');
  // }

  private getKKById(id: number) {
    this.httpService.getAsync(ApiConst.getKinOrKithById + id).then(data => {
      this.user = data;

      this.kinOrkithForm.controls.email.setValue(data.email);
      this.kinOrkithForm.controls.name.setValue(data.name);
      this.kinOrkithForm.controls.phonenumber.setValue(data.phoneNumber);

      console.log(this.user);
    })
  }

}
