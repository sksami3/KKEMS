import { ToastrService } from "ngx-toastr"
import { Injectable } from '@angular/core';


@Injectable()
export class Toastr {

    constructor(private toastr:ToastrService) {

    }

    Success(message: string) {
        this.toastr['success'](message,'SUCCESS')
    }


    Info(message: string) {
        this.toastr['info'](message,'INFO')
    }

    Error(message: string) {
        this.toastr['error'](message, 'ERROR')
    }

}