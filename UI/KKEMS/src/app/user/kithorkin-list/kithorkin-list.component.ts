import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

export class KithorkinListComponent implements OnInit, AfterViewInit {

  kithOrKins = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['position', 'name', 'email', 'Action'];
  dataSource = this.kithOrKins;
  clickedRows = new Set<kithOrKinElement>();
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  constructor(private httpService: HttpClientService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) {
    this.getkithOrKins();
  }

  ngOnInit() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.symbol.toLowerCase().includes(filter) || data.position.toString() === filter;
    };
  }

  ngAfterViewInit(): void {
    this.kithOrKins.paginator = this.paginator;
  }

  getkithOrKins() {
    let id = this.authService.userValue.id;
    this.httpService.getAsync(ApiConst.getKinOrKith + id).then(data => {
      this.kithOrKins = data;

      this.dataSource = this.kithOrKins;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
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

  /*
    Filter
  */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
