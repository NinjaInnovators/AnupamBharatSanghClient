import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userRole:BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public isLogin:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isRegister:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isForgetPassword:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  setuserRole(userRole:string){
    this.userRole.next(userRole);
 }

 getuserRole():Observable<string>{
    return this.userRole.asObservable();
 }

 setLoginStatus(isLoggedIn:boolean){
  this.isLoggedIn.next(isLoggedIn);
}

getLoginStatus():Observable<boolean>{
  return this.isLoggedIn.asObservable();
}

 setisLogin(isLogin:boolean){
  this.isLogin.next(isLogin);
}

getisLogin():Observable<boolean>{
  return this.isLogin.asObservable();
}

setisRegister(isRegister:boolean){
  this.isRegister.next(isRegister);
}

getisRegister():Observable<boolean>{
  return this.isRegister.asObservable();
}

setisForgetPassword(isForgetPassword:boolean){
  this.isForgetPassword.next(isForgetPassword);
}

getisForgetPassword():Observable<boolean>{
  return this.isForgetPassword.asObservable();
}

markFormGroupTouched(formGroup: FormGroup) {
  (<any>Object).values(formGroup.controls).forEach((x:any) => {
    x.markAsTouched();
    if (x.controls) {
      this.markFormGroupTouched(x);
    }
  });
}

}
