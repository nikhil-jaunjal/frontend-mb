import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private token: string;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('jwt', this.token);
  }

  getToken() {
    return localStorage.getItem('jwt');
  }
}
