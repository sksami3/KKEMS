import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';

export interface RelationshipElement {
  name: string;
  createdDate: Date;
}

@Component({
  selector: 'app-relationship-list',
  templateUrl: './relationship-list.component.html',
  styleUrls: ['./relationship-list.component.scss']
})

export class RelationshipListComponent implements OnInit {

  relationships = [];
  displayedColumns: string[] = ['position', 'name', 'createDate', 'Action'];
  dataSource = this.relationships;
  clickedRows = new Set<RelationshipElement>();

  constructor(private httpService: HttpClientService,
    private router: Router,
    private route: ActivatedRoute) {
    this.getRelationships();
  }

  ngOnInit() {

  }

  getRelationships() {
    this.httpService.getAsync(ApiConst.getRelationships).then(data => {
      this.relationships = data;

      this.dataSource = this.relationships;
    })

  }

  deleteRelationship(id: string) {
    this.httpService.postAsync(ApiConst.deleteRelationship + id, null).subscribe(data => {
      this.getRelationships();
    })

  }

  edit(id: string) {
    this.router.navigate(['User/relationship/' + id]);
  }


}
