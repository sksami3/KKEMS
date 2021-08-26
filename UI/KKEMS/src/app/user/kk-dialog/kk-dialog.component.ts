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
import { GroupComponent } from '../group/group.component';

export class kk {
  id: number;
  name: string;
}

@Component({
  selector: 'app-kk-dialog',
  templateUrl: './kk-dialog.component.html',
  styleUrls: ['./kk-dialog.component.scss']
})
export class KkDialogComponent implements OnInit {

  kinOrkiths: User[];
  isReady: boolean = false;
  selectedValue: any;

  constructor(private httpService: HttpClientService,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<GroupComponent>,
    private modalPopupService: ModalPopupService) { }

  myControl = new FormControl();
  //options: string[];// = ['One', 'Two', 'Three'];
  filteredOptions: Observable<kk[]>;

  kks: Array<kk>;

  ngOnInit() {
    this.getKinOrKith();
  }

  private _filter(value: string): kk[] {
    const filterValue = value.toLowerCase();

    //return this.options.filter(option => option.toLowerCase().includes(filterValue));

    let result = this.kks.filter(val => val.name.toLowerCase().includes(filterValue));
    return result;//.map(x => x.id, x.name);

    // return this.kks.map(x => x.name).filter(option =>
    //   option.toLowerCase().includes(value.toLowerCase()));
  }

  private getKinOrKith() {
    let id = this.authService.userValue.id;

    this.httpService.getAsync(ApiConst.getKinOrKith + id).then(data => {
      this.kinOrkiths = data;
      this.kks = this.kinOrkiths.map(o => { return { id: o.id, name: o.name } })

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
  }

  public getSelectedKK(kkId: any) {
    let result = this.kks.find(x => x.id == kkId);

    this.modalPopupService.emit(result);
  }

}
