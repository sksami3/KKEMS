import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';

export interface kithOrKinElement {
  name: string;
  createdDate: Date;
}

@Component({
  selector: 'app-kithorkin-list',
  templateUrl: './kithorkin-list.component.html',
  styleUrls: ['./kithorkin-list.component.scss']
})
export class KithorkinListComponent implements OnInit {

  kithOrKins = [];
  displayedColumns: string[] = ['position', 'name', 'createDate', 'Action'];
  dataSource = this.kithOrKins;
  clickedRows = new Set<kithOrKinElement>();

  constructor(private httpService: HttpClientService,
    private router: Router,
    private route: ActivatedRoute,
    private authService : AuthenticationService) {
    this.getkithOrKins();
  }

  ngOnInit() {

  }

  getkithOrKins() {
    let id = this.authService.userValue.id;
    this.httpService.getAsync(ApiConst.getKinOrKith + id).then(data => {
      this.kithOrKins = data;

      this.dataSource = this.kithOrKins;
    })

  }

  deletekithOrKin(id: string) {
    this.httpService.postAsync(ApiConst.deleteKinOrKith + id, null).subscribe(data => {
      this.getkithOrKins();
    })

  }

  edit(id: string) {
    this.router.navigate(['User/kithorkin/' + id]);
  }


}
