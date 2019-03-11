import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './models/user';
import {LoginResponse} from './models/loginresponse';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLoginUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { }

  attemptSignIn( user: User) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.userLoginUrl, user, httpOptions);
            /*.pipe(
              catchError(this.handleError<User>('addUser'))
            ); */
  }
  
}
