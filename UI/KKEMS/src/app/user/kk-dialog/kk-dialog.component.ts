import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/_model';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { HttpClientService } from 'src/app/_service/httpClient.service';
import { ApiConst } from 'src/app/_utility/ApiConst';

@Component({
  selector: 'app-kk-dialog',
  templateUrl: './kk-dialog.component.html',
  styleUrls: ['./kk-dialog.component.scss']
})
export class KkDialogComponent implements OnInit {

  kinOrkiths: User[];
  isReady: boolean= false;
  constructor(private httpService: HttpClientService, private authService: AuthenticationService) { }

  myControl = new FormControl();
  options: string[];// = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.getKinOrKith();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private getKinOrKith() {
    let id = this.authService.userValue.id;

    this.httpService.getAsync(ApiConst.getKinOrKith + id).then(data => {
      console.log(data);
      this.kinOrkiths = data;
      this.options = this.kinOrkiths.map(function(item) {
        return item['name'];
      });

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
  }

}
