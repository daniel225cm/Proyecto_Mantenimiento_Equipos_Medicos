import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http = inject(HttpClient);

  private api = 'http://localhost:3000/auth';

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.api}/login`, data);
  }

  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {

    return this.http.post(`${this.api}/register`, data);

  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

}
