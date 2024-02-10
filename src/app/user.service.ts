import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logindetail, UsersDetails } from './logindetail';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }



  authenticateUser(username: string, password: string): Observable<UsersDetails | null> {
    // Retrieve user details from local storage
    const users: UsersDetails[] = JSON.parse(localStorage.getItem('userList') || '[]');

    // Find the user with the provided username and password
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // User authenticated, return the user details
      return of(user);
    } else {
      // Authentication failed
      return of(null);
    }
  }
}
