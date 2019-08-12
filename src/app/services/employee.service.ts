import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  showEmployees() {
    return this.http.get('http://localhost:2323/managers/employees')
      .pipe(response => response);
  }

  addEmployee(data: any) {
    const employee = {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      dob: data.dob.year + '-' + data.dob.month + '-' + data.dob.day,
      mobile: data.mobile,
      manager: localStorage.getItem('managerId')
    };
    return this.http.post('http://localhost:2323/managers/employees', employee)
      .pipe(response => response);
  }

  updateEmployee(data: any) {
    const employee = {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      dob: data.dob,
      mobile: data.mobile
    };
    return this.http.put('http://localhost:2323/managers/employees/' + data._id, employee)
      .pipe(response => response);
  }

  deleteEmployee(id: string) {
    return this.http.delete('http://localhost:2323/managers/employees/' + id)
      .pipe(response => response);
  }
}
