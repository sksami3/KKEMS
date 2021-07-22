import { Route } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user.component';

export const UserRoutes: Route[] = [
    {
        path: '',
        component: UserComponent,
        // canActivate : [AuthGuard],
        children: [
            { path: 'header', component: HeaderComponent },
            // { path: 'product', component: ProductComponent, data: { roles: ['Admin'] } },
        ]
    }
];