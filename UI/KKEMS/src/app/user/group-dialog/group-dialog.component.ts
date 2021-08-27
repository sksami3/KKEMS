import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/_model';
import { Group } from 'src/app/_model/group';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ModalPopupService } from 'src/app/_service/modalService';
import { ApiConst } from 'src/app/_utility/ApiConst';
import { GroupComponent } from '../group/group.component';

export class group {
  id: number;
  name: string;
}

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {
  Groups: Group[];
  isReady: boolean = false;
  selectedValue: any;

  constructor(private httpService: HttpClientService,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<GroupComponent>,
    private modalPopupService: ModalPopupService) { }

  myControl = new FormControl();
  //options: string[];// = ['One', 'Two', 'Three'];
  filteredOptions: Observable<group[]>;

  groups: Array<group>;

  ngOnInit() {
    this.getGroups();
  }

  private _filter(value: string): group[] {
    const filterValue = value.toLowerCase();

    //return this.options.filter(option => option.toLowerCase().includes(filterValue));

    let result = this.groups.filter(val => val.name.toLowerCase().includes(filterValue));
    return result;//.map(x => x.id, x.name);

    // return this.groups.map(x => x.name).filter(option =>
    //   option.toLowerCase().includes(value.toLowerCase()));
  }

  private getGroups() {
    let id = this.authService.userValue.id;

    this.httpService.getAsync(ApiConst.getGroups).then(data => {
      this.Groups = data;
      this.groups = this.Groups.map(o => { return { id: o.id, name: o.name } })

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
  }

  public getSelectedGroup(groupId: any) {
    let result = this.groups.find(x => x.id == groupId);

    this.modalPopupService.emit(result);
  }

}
