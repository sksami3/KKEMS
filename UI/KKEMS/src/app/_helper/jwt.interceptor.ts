import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_service/authentication.service';
import { ApiConst } from '../_utility/ApiConst';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const user = this.authenticationService.userValue;
        //const isLoggedIn = user && token;
        let token = localStorage.getItem("user");
        const isApiUrl = request.url.startsWith(ApiConst.baseUrl);
        // console.log("is lolla logged:");
        console.log("is lolla apiUser:"+ isApiUrl);
        if (isApiUrl && user != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.TOKEN}`
                }
            });
        }

        return next.handle(request);
    }
}