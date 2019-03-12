import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {User} from '../models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : User ;
  dashboardUrl :string;
  errorMessage:string;

  onSignIn(): void {
    //TODO : make service that tries to logs user in, store the token for this user
    //TODO : aftersuccesful login redirect to dashboard where user can see his/her cart
    this.authService.attemptSignIn(this.user)
      .pipe(first())
      .subscribe( loginResponse => {
          if (loginResponse.success ==true && loginResponse.token){
            this.router.navigateByUrl(this.dashboardUrl);
          } else {
            this.errorMessage = loginResponse.message;
          }
        },error => {
          this.errorMessage = error;
        }
      
      );
  }

  constructor(private authService:AuthService , private router: Router ) { }

  ngOnInit() {
    this.user ={
      username: "",
      password: ""
    };
    this.dashboardUrl ='dashboard';
    this.errorMessage ="";
    this.authService.logout();
  }

}
