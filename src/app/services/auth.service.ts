import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'
    })
};

const baseUrl = 'http://localhost:8080/accounts/api/auth/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _user: User = {
    id: 0,
    username: '',
    password:'',
    name:'',
    last_name:'',
    email:'',
  }

  constructor(private http: HttpClient) { } 

  public get user(): User{
    if(this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('currentUser') != null) {
      this._user = sessionStorage.getItem('currentUser') as User;
      return this._user;
    }
    return new User();
  }

  saveUser(user: User): void{
    this._user.id = user.id;
    this._user.username = user.username;
    this._user.name = user.name;
    this._user.last_name = user.last_name;
    this._user.email = user.email;    
  }

  login(username: string, password: string) {
      return this.http.post<any>(baseUrl, { username, password }, httpOptions)
      .pipe(
        map(user => {
          if (user && user.token) {            
            sessionStorage.setItem("currentUser", JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logout() {    
    sessionStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    if (sessionStorage.length != 0){
      return true;
    }
    return false;
  }

}
