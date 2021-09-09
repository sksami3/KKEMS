import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logo = 'assets/img/logo.png';

  constructor(private authenticationService: AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authenticationService.logout();

    //this.router.navigate(['/login']);
  }

}
