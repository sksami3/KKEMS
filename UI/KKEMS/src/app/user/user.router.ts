import { Route } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user.component';

export const UserRoutes: Route[] = [
    {
        path: 'User',
        component: UserComponent,
        // canActivate : [AuthGuard],
        children: [
            { path: 'header', component: HeaderComponent }
            // { path: 'product', component: ProductComponent, data: { roles: ['Admin'] } },
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