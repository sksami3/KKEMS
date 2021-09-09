import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { GroupComponent } from './group/group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientService } from '../_service/httpClient.service';
import { Toastr } from '../_service/toastr.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../_helper/jwt.interceptor';
import { ErrorInterceptor } from '../_helper/error.interceptor';
import {MatTableModule} from '@angular/material/table';
import { KithorkinComponent } from './kithorkin/kithorkin.component';
import { KithorkinListComponent } from './kithorkin-list/kithorkin-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { KkDialogComponent } from './kk-dialog/kk-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ModalPopupService } from '../_service/modalService';
import { DialogConfirmComponent } from '../common/dialog-confirm/dialog-confirm.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { RelationshipListComponent } from './relationship-list/relationship-list.component';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { RelationshipDialogComponent } from './relationship-dialog/relationship-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    HeaderComponent,
    UserComponent,
    GroupComponent,
    GroupListComponent,
    KithorkinComponent,
    KithorkinListComponent,
    DialogConfirmComponent,
    KkDialogComponent,
    RelationshipComponent,
    RelationshipListComponent,
    GroupDialogComponent,
    ExpenseComponent,
    ExpenseListComponent,
    RelationshipDialogComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    HttpClientService, 
    ModalPopupService,
    Toastr
  ]
})
export class UserModule { }
