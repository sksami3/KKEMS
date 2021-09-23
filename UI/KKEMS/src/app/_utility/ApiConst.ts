import { environment } from "src/environments/environment";

export class ApiConst {
    // Get BASE_URL from the configured environment, empty stirng used as fallback
     private static BASE_URL  = /*"http://localhost:85"*/ environment.apiUrl || "";

    //  static getProducts = ApiConst.BASE_URL + '/api/Product/GetAll';
    //  static postProduct = ApiConst.BASE_URL + '/api/Product/Add';
    //  static getProductById = ApiConst.BASE_URL + '/api/Product/Get/';
    //  static updateProduct = ApiConst.BASE_URL + '/api/Product/Update';
    //  static deleteProduct = ApiConst.BASE_URL + '/api/Product/Delete/';
     
     static baseUrl = ApiConst.BASE_URL;
     static getUsers = ApiConst.BASE_URL + '/api/Account/GetAllUsers';
     static getKinOrKith = ApiConst.BASE_URL + '/api/Account/GetAllKinOrKithByCreatedUserId/';
     static deleteKinOrKith = ApiConst.BASE_URL + '/api/Account/Delete/';
     static postUser = ApiConst.BASE_URL + '/api/Account/Register';
     static postConfirmEmail = ApiConst.BASE_URL + '/api/Account/ConfirmEmail';
     static authenticate = ApiConst.BASE_URL + '/api/Account/Authenticate';

     static postGroup = ApiConst.BASE_URL + '/api/Group/Add';
     static updateGroup = ApiConst.BASE_URL + '/api/Group/Update';
     static getGroups = ApiConst.BASE_URL + '/api/Group/GetAll';
     static getGroup = ApiConst.BASE_URL + '/api/Group/Get/';
     static deleteGroup = ApiConst.BASE_URL + '/api/Group/Delete/';

     static postRelationship = ApiConst.BASE_URL + '/api/Relationship/Add';
     static updateRelationship = ApiConst.BASE_URL + '/api/Relationship/Update';
     static getRelationships = ApiConst.BASE_URL + '/api/Relationship/GetAll';
     static getRelationship = ApiConst.BASE_URL + '/api/Relationship/Get/';
     static deleteRelationship = ApiConst.BASE_URL + '/api/Relationship/Delete/';

     static postExpense = ApiConst.BASE_URL + '/api/Expense/Add';
     static updateExpense = ApiConst.BASE_URL + '/api/Expense/Update';
     static getExpenses = ApiConst.BASE_URL + '/api/Expense/GetAll';
     static getExpense = ApiConst.BASE_URL + '/api/Expense/Get/';
     static deleteExpense = ApiConst.BASE_URL + '/api/Expense/Delete/';

     static groupExpenseStatistics = ApiConst.BASE_URL + '/api/Statistics/GetGroupStatistics';
     static kithOrKinExpenseStatistics = ApiConst.BASE_URL + '/api/Statistics/GetKithOrKinStatistics';
     static GetMonthlyExpenseStatistics = ApiConst.BASE_URL + '/api/Statistics/GetMonthlyExpenseStatistics';

}