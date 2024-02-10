import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Logindetail } from '../logindetail';
import { Router } from "@angular/router";
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logindetails:Logindetail={
    username:'',
    password:''
  }

  constructor(private http: HttpClient, private router:Router, private service:UserService) {
    
  }

  ngOnInit(): void {
    const userListString = localStorage.getItem('userList');

if (!userListString) {
  // userList does not exist, set default admin user
  const defaultUserList = [
    { username: 'user', password: 'pass@user', email: 'user@ss.com', role: 'user' },
    { username: 'sarab', password: 'sarab@1', email: 'sarabjeetsinghdigwa@gmail.com', role: 'admin' }
  ];
  
  localStorage.setItem('userList', JSON.stringify(defaultUserList));
}
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      // Form validation failed
      return;
    }

    const username = loginForm.value.username;
    const password = loginForm.value.password;

    // Call a service method to authenticate the user
    this.service.authenticateUser(username, password).subscribe((user) => {
      if (user) {
        if (user.role === 'admin') {
          // Navigate to register user page for admin
          this.router.navigate(['/register']);
        } else if (user.role === 'user') {
          // Navigate to upload file page for user
          this.router.navigate(['/fileUpload']);
        }
      } else {
        alert('Incorrect Username or Password');
      }
    });
  }
}
