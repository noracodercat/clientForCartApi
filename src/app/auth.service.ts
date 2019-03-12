import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './models/user';
import {LoginResponse} from './models/loginresponse';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'jwt_token';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLoginUrl:string = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { }

  attemptSignIn( user: User) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.userLoginUrl, user, httpOptions)
        .pipe(map(loginResponse => {
          // login successful if there's a jwt token in the response
          if (loginResponse && loginResponse.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              //localStorage.setItem('currentUser', JSON.stringify(user));
              this.setToken(loginResponse.token);
          }

          return loginResponse;
        }));
            /*.pipe(
              catchError(this.handleError<User>('addUser'))
            ); */
  }

  logout() {
    // remove token from local storage to log user out
    localStorage.removeItem(TOKEN_NAME);
  }
  //-------------------

  
  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  
}
