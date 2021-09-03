import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/_model';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ModalPopupService } from 'src/app/_service/modalService';
import { ApiConst } from 'src/app/_utility/ApiConst';
import { RelationshipComponent } from '../relationship/relationship.component';

export class Relationship {
  id: number;
  name: string;
}
@Component({
  selector: 'app-relationship-dialog',
  templateUrl: './relationship-dialog.component.html',
  styleUrls: ['./relationship-dialog.component.scss']
})
export class RelationshipDialogComponent implements OnInit {
  Relationships: Relationship[];
  isReady: boolean = false;
  selectedValue: any;

  constructor(private httpService: HttpClientService,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<RelationshipComponent>,
    private modalPopupService: ModalPopupService) { }

  myControl = new FormControl();
  //options: string[];// = ['One', 'Two', 'Three'];
  filteredOptions: Observable<Relationship[]>;

  relationships: Array<Relationship>;

  ngOnInit() {
    this.getRelationships();
  }

  private _filter(value: string): Relationship[] {
    const filterValue = value;

    //return this.options.filter(option => option.toLowerCase().includes(filterValue));

    let result = this.relationships.filter(val => val.name.toLowerCase().includes(filterValue));
    return result;//.map(x => x.id, x.name);

    // return this.relationships.map(x => x.name).filter(option =>
    //   option.toLowerCase().includes(value.toLowerCase()));
  }

  private getRelationships() {
    let id = this.authService.userValue.id;

    this.httpService.getAsync(ApiConst.getRelationships).then(data => {
      this.Relationships = data;
      this.relationships = this.Relationships.map(o => { return { id: o.id, name: o.name } })

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
  }

  public getSelectedRelationship(relationshipId: any) {
    let result = this.relationships.find(x => x.id == relationshipId);

    this.modalPopupService.emit(result);
  }

}

