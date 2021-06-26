import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/User';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

const header =  new HttpHeaders({
    'Content-Type': 'application/json',
  }).set(
    "Authorization",
     localStorage.getItem("userToken")
  );
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUri : string = "https://localhost:44383/api/connect";
  signupUri : string = "https://localhost:44383/api/register";

  constructor(private http: HttpClient) { }

  saveUser(user: User): Observable<any> {
    return this.http.post<any>(this.authUri, user, httpOptions)  ;
  }

  signUpUser(user: User): Observable<any> {
    return this.http.post<any>(this.signupUri, user, httpOptions);
  }

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem("userToken");
    const header =  new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer "+ token
    });
    console.log(header)
    header.append("Authorization", "Bearer "+ token);
    console.log(header)
    return this.http.get<any>(this.authUri, {headers:header})
  }
}
