import { environment } from "src/environments/environment";

export class ApiConst {
    // Get BASE_URL from the configured environment, empty stirng used as fallback
     private static BASE_URL  = environment.apiUrl || "";

    //  static getProducts = ApiConst.BASE_URL + '/api/Product/GetAll';
    //  static postProduct = ApiConst.BASE_URL + '/api/Product/Add';
    //  static getProductById = ApiConst.BASE_URL + '/api/Product/Get/';
    //  static updateProduct = ApiConst.BASE_URL + '/api/Product/Update';
    //  static deleteProduct = ApiConst.BASE_URL + '/api/Product/Delete/';
     
     static getAccount = ApiConst.BASE_URL + '/api/Account/GetAllUsers';
     static postUser = ApiConst.BASE_URL + '/api/Account/Register';
     static postConfirmEmail = ApiConst.BASE_URL + '/api/Account/ConfirmEmail';
     static authenticate = ApiConst.BASE_URL + '/api/Account/Authenticate';
}