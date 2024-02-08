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
    id: 0,
    username: '',
    email: '',
    role: '',
  };
  userList: UsersDetails[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const storedUserList = localStorage.getItem('userList');
    if (storedUserList) {
      this.userList = JSON.parse(storedUserList);
    }
  }
  registerUser(registrationForm: NgForm) {
    this.userdetails = {
      id: this.userList.length + 1,
      username: registrationForm.value.username,
      email: registrationForm.value.email,
      role: registrationForm.value.role
    };
    this.userList.push(this.userdetails);
    
    // Store updated user list in local storage
    localStorage.setItem('userList', JSON.stringify(this.userList));
  }

  deleteUser(id: number) {
    const index = this.userList.findIndex(user => user.id === id);
    if (index !== -1) {
      this.userList.splice(index, 1);
      
      // Update local storage after deleting user
      localStorage.setItem('userList', JSON.stringify(this.userList));
    }
  }
}

