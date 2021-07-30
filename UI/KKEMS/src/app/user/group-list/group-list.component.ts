import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';

export interface GroupElement {
  name: string;
  createdDate: Date;
}

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groups=[];
  displayedColumns: string[] = ['position', 'name', 'createDate'];
  dataSource = this.groups;
  clickedRows = new Set<GroupElement>();

  constructor(private httpService:HttpClientService,
    private router:Router,  
    private route: ActivatedRoute) { 
    this.getGroups();
  }
  getGroups(){
    this.httpService.getAsync(ApiConst.getGroups).then(data => {
      this.groups = data;

      this.dataSource = this.groups;
    })
    
  }

  deleteGroup(id : string){
    this.httpService.postAsync(ApiConst.deleteGroup + id,null).subscribe(data => {
      this.getGroups();
    })
    
  }
  ngOnInit() {
  }

}
