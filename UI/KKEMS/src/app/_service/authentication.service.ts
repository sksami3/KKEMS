import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { ApiConst } from 'src/app/_utility/ApiConst';
import { User } from '../_model/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private static BASE_URL = /*"http://localhost:85";*/environment.apiUrl || "";
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') as string));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, passwordhash: string) {

        return this.http.post<any>(ApiConst.authenticate, { username, passwordhash })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    loginByEmail(email: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<any>(`${AuthenticationService.BASE_URL}users/GetByEmail?email=` + email, httpOptions)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // if (this.userValue.role == 'Admin') {
        //     localStorage.removeItem('user');
        //     this.userSubject.next(null as any) ;
        //     // this.router.navigate(['/login']);
        //     this.router.navigate(['/login']);
        // }
        // else {
        // remove user from local storage to log user out
        console.log('in logout');
        localStorage.removeItem('user');
        this.userSubject.next(null as any);
        this.router.navigate(['Auth/login']);
        // }

    }

    sendResetLink(email: string, token: string): Observable<boolean> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<boolean>(`${AuthenticationService.BASE_URL}users/SendResetLink`, { email, token }, httpOptions);
        //.pipe(catchError(this.processHTTPMsgService.handleError));
    }
}