import { Toastr } from './toastr.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Injectable()
export class HttpClientService {

  constructor(private httpClient: HttpClient/*, private toast:Toastr*/) { }

  postAsync(api: string, body: any) {
    return this.httpClient.post(api, body, this.getToken())
    .pipe(map((data: any) => {
        if (data.result){
          if (data.message){
            //this.toast.Success(data.message);
          }
          return data.result;
        }
         
    }), catchError(error => this.handleError(error)));

   
  }

  getAsync(api: string) : Promise<any> {
    return new Promise((resolve, reject) => {
        this.httpClient.get(api).subscribe((data: any) => {
        if (data) {

          resolve(data);
        } else {
          this.handleError(data.error);
          reject(data.error);
        }
      },
      catchError(error => this.handleError(error)));
    });
    }

    private getToken(): any {
      var options = {
        headers :{}
     }
        // create authorization header with jwt token
        let token = localStorage.getItem("token");
        if (token) {
            let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
            options.headers = headers;   
        }
        return options;
    }


    private handleError(error: any) {
      console.log(error);
      const applicationError = error.headers.get('Application-Error');
      if (applicationError) {
          return throwError(applicationError);
      }
      const code = error.status;
       let modelStateErrors = '';
      // if (serverError) {
      //     for (const key in serverError) {
      //         if (serverError[key]) {
      //             modelStateErrors += serverError[key] + "\n";
      //         }
      //     }
      // }
      if (code === 500){
        if (error.error.Message){
          //this.toast.Error(error.error.Message);
        }
        console.log(error.error.Message);
      }
      if (code === 400){
        if (error.error.Message){
          //this.toast.Error(error.error.Message);
        }
        if(error.error.title){
          //this.toast.Error(error.error.title);
        }
          console.log(error.error.Error);
          //this.alertify.error(error.error.Error);
      }
      if (code === 401){
          console.log(error.error.Error);
          //this.alertify.error(error.error.Error);
          
      }
      return throwError(
          modelStateErrors || 'Server error'
      );
  }

 
}
