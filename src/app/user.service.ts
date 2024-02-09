import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor(private http :HttpClient) { }

  uploadFile(file:File){
    const formData = new FormData();
    formData.append('file', file);
    const URL = `https://file.io/`;
   return this.http.post(URL, formData)
  }

  downloadFile(){
    const URL = `https://file.io/`;
   return this.http.get(URL)
  }
}
