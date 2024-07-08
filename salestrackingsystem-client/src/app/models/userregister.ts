import { IUserLogin } from "./userlogin";

export interface IUserRegister {
    user:IUserLogin;
    firstName:string;
    lastName:string;
    phoneNumber:string;
}