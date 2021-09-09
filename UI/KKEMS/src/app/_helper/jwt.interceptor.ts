import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_service/authentication.service';
import { ApiConst } from '../_utility/ApiConst';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService, private router : Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const user = this.authenticationService.userValue;
        //const isLoggedIn = user && token;
        let token = localStorage.getItem("user");
        const isApiUrl = request.url.startsWith(ApiConst.baseUrl);

        if (isApiUrl && user != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            
        }
        else{
            this.router.navigate(["Auth/login"]);
        }

        return next.handle(request);
    }
}