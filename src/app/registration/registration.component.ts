import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UsersDetails } from '../logindetail';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  username: string = '';
  password: string = '';
  userdetails: UsersDetails = {
    username: '',
    password: '',
    email: '',
    role: '',
  };
  userList: UsersDetails[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    const storedUserList = localStorage.getItem('userList');
    if (storedUserList) {
      this.userList = JSON.parse(storedUserList);
    }
  }
  registerUser(registrationForm: NgForm) {
    // Retrieve existing user list from local storage
    let userListString = localStorage.getItem('userList');
    let userList: any[] = [];
    if (userListString) {
      userList = JSON.parse(userListString);
    }
  
    // Create new user details
    const userDetails = {
      username: registrationForm.value.username,
      password: registrationForm.value.password,
      email: registrationForm.value.email,
      role: registrationForm.value.role
    };
  
    // Push new user details to the user list
    userList.push(userDetails);
  
    // Store updated user list in local storage
    localStorage.setItem('userList', JSON.stringify(userList));

    this.getUserList();
  }

  deleteUser(id: string) {
    const index = this.userList.findIndex(user => user.username === id);
    if (index !== -1) {
      this.userList.splice(index, 1);
      
      // Update local storage after deleting user
      localStorage.setItem('userList', JSON.stringify(this.userList));
    }
  }
}

