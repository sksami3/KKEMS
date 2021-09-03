import { Route } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseComponent } from './expense/expense.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupComponent } from './group/group.component';
import { HeaderComponent } from './header/header.component';
import { KithorkinListComponent } from './kithorkin-list/kithorkin-list.component';
import { KithorkinComponent } from './kithorkin/kithorkin.component';
import { RelationshipListComponent } from './relationship-list/relationship-list.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { UserComponent } from './user.component';

export const UserRoutes: Route[] = [
    {
        path: 'User',
        component: UserComponent,
        // canActivate : [AuthGuard],
        children: [
            { path: 'header', component: HeaderComponent },
            { path: 'group-list', component: GroupListComponent, data: { roles: ['Admin'] } },
            { path: 'group', component: GroupComponent, data: { roles: ['Admin'] } },
            { path: 'group/:id', component: GroupComponent, data: { roles: ['Admin'] } },
            { path: 'relationship-list', component: RelationshipListComponent, data: { roles: ['Admin'] } },
            { path: 'relationship', component: RelationshipComponent, data: { roles: ['Admin'] } },
            { path: 'relationship/:id', component: RelationshipComponent, data: { roles: ['Admin'] } },
            { path: 'kithorkin', component: KithorkinComponent, data: { roles: ['Admin'] } },
            { path: 'kithorkin/:id', component: KithorkinComponent, data: { roles: ['Admin'] } },
            { path: 'kithorkin-list', component: KithorkinListComponent, data: { roles: ['Admin'] } },
            { path: 'expense-list', component: ExpenseListComponent, data: { roles: ['Admin'] } },
            { path: 'expense', component: ExpenseComponent, data: { roles: ['Admin'] } },
            { path: 'expense/:id', component: ExpenseComponent, data: { roles: ['Admin'] } },
        ]
    },
    {
        path: 'Auth',
        component: AuthComponent,
        // canActivate : [AuthGuard],
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
            // { path: 'product', component: ProductComponent, data: { roles: ['Admin'] } },
        ]
    }
];