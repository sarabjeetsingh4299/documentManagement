import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Logindetail } from '../logindetail';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  logindetails:Logindetail={
    username:'',
    password:''
  }

  constructor(private http: HttpClient, private router:Router) {}

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      // Form validation failed
      return;
    }

    const credentials = { username: this.logindetails.username, password: this.logindetails.password };

   if(credentials.username === 'admin' && credentials.password === 'xyz@123'){
    this.router.navigate(['/register']);
   }else{
    alert('Incorrect Username or Password ');
    this.logindetails.username = '';
    this.logindetails.password = '';
   }
  }
}
