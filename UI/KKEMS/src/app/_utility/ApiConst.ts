import { environment } from "src/environments/environment";

export class ApiConst {
    // Get BASE_URL from the configured environment, empty stirng used as fallback
     private static BASE_URL  = environment.apiUrl || "";

    //  static getProducts = ApiConst.BASE_URL + '/api/Product/GetAll';
    //  static postProduct = ApiConst.BASE_URL + '/api/Product/Add';
    //  static getProductById = ApiConst.BASE_URL + '/api/Product/Get/';
    //  static updateProduct = ApiConst.BASE_URL + '/api/Product/Update';
    //  static deleteProduct = ApiConst.BASE_URL + '/api/Product/Delete/';
     
     static baseUrl = ApiConst.BASE_URL;
     static getUsers = ApiConst.BASE_URL + '/api/Account/GetAllUsers';
     static getKinOrKith = ApiConst.BASE_URL + '/api/Account/GetAllKinOrKithByCreatedUserId/';
     static postUser = ApiConst.BASE_URL + '/api/Account/Register';
     static postConfirmEmail = ApiConst.BASE_URL + '/api/Account/ConfirmEmail';
     static authenticate = ApiConst.BASE_URL + '/api/Account/Authenticate';

     static postGroup = ApiConst.BASE_URL + '/api/Group/Add';
     static updateGroup = ApiConst.BASE_URL + '/api/Group/Update';
     static getGroups = ApiConst.BASE_URL + '/api/Group/GetAll';
     static getGroup = ApiConst.BASE_URL + '/api/Group/Get/';
     static deleteGroup = ApiConst.BASE_URL + '/api/Group/Delete/';

}