import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../models/user";
import { SharedService } from "./shared.service";

@Injectable({ providedIn: "root" })
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router, 
    private http: HttpClient,
    private sharedService:SharedService
    ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public signIn(url: string, body: any){    
    localStorage.clear();
    return this.http
    .post<User>(environment.API_ENDPOINT+url,body)
    .pipe(
      catchError(err => {
        return err;
      }),
      map((response:any) => {
        if(response.statusCode===200){
          localStorage.setItem("user", JSON.stringify(response.data));         
          this.userSubject.next(response.data);
          this.setToken('accessToken',response.data.accessToken);
          this.setToken('refreshToken',response.data.refreshToken);
          this.setLocalStorage(response.data);
        }
        return response;
      })
    );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("user");
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');    
    this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }

  getCurrentUser(): Observable<any> {
    return this.user.pipe(
     switchMap(user => {
      // check if we already have user data
      if (user) {
       return of(user);
      }   
      const token = localStorage.getItem('accessToken');
      // if there is token then fetch the current user
      if (token) {
       return this.fetchCurrentUser();
      }   return of(null);
     })
    );
   }

   fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.API_ENDPOINT}/api/v1/account/GetCurrentUser`)
     .pipe(
      tap(user => {
       // save data to this.user$
       this.userSubject.next(user);
      })
     );
   }

  // register(user: User) {
  //   return this.http.post(`${environment.API_ENDPOINT}/api/v1/account/register`, user);
  // }

  public register(url: string, body: any){
    localStorage.clear();
    return this.http
    .post<User>(environment.API_ENDPOINT+url,body)
    .pipe(
      catchError(err => {
        return err;
      }),
      map((response:any) => {
        if(response.statusCode===201){
          localStorage.setItem("user", JSON.stringify(response));
          this.userSubject.next(response);
        }
        return response;
      })
    );
  }

  update(id, params) {
    return this.http
      .put(`${environment.API_ENDPOINT}/api/v1/account/${id}`, params)
      .pipe(
        map((x) => {
          // update stored user if the logged in user updated their own record
          if (id == this.userValue.id) {
            // update local storage
            const user = { ...this.userValue, ...params };
            localStorage.setItem("user", JSON.stringify(user));

            // publish updated user to subscribers
            this.userSubject.next(user);
          }
          return x;
        })
      );
  }

  delete(id: string) {
    return this.http.delete(`${environment.API_ENDPOINT}/api/v1/account/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      })
    );
  }
  setLocalStorage(x){
    this.sharedService.setLoginStatus(true);  
    localStorage.setItem('role',x.role);
    localStorage.setItem('username',x.username);
    localStorage.setItem('emailId',x.emailId);
    localStorage.setItem('mobileNo',x.mobileNo);
    localStorage.setItem('isLoggedIn','true');
  }
  
  private setToken(key: string, token: string): void {
    localStorage.setItem(key, token);  
  }

}
