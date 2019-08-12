import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  registerManager(managerData: any) {
    const manager = {
      firstName: managerData.firstName,
      lastName: managerData.lastName,
      password: managerData.password,
      email: managerData.email,
      dob: managerData.dob.year + '-' + managerData.dob.month + '-' + managerData.dob.day,
      company: managerData.company
    };
    return this.http.post('http://localhost:2323/managers/signup', manager)
      .pipe(response => response);
  }

  loginManager(managerData: any) {
    const manager = {
      password: managerData.password,
      email: managerData.email
    };
    return this.http.post('http://localhost:2323/managers/login', manager)
      .pipe(response => response);
  }


}
