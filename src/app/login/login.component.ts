import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {User} from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : User ;
  dashboardUrl :string;
  errorMessage:string;
  token:string;

  onSignIn(): void {
    //TODO : make service that tries to logs user in, store the token for this user
    //TODO : aftersuccesful login redirect to dashboard where user can see his/her cart
    this.authService.attemptSignIn(this.user)
      .subscribe( loginResponse => {
        if (loginResponse.success ==true && loginResponse.token){
          this.token = loginResponse.token;
          /*this.router.navigateByUrl(this.dashboardUrl);*/
        } else {
          this.errorMessage = loginResponse.message;
        }
      });
  }

  constructor(private authService:AuthService /*, private router: Router */) { }

  ngOnInit() {
    this.user ={
      username: "",
      password: ""
    };
    this.dashboardUrl ='http://localhost:3000/cart';
    this.errorMessage ="";
    this.token="";
  }

}
