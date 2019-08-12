import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private employeeService: EmployeeService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  employeeList: any;
  employee: any;
  employeeId: any;
  employeeForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    address: ['', Validators.required],
    dob: ['', Validators.required]
  });
  employeeEditForm: any;
  initErrorFlag = false;
  addEmployeeErrorFlag = false;
  operationErrorFlag = false;
  updateOperationErrorFlag = false;


  ngOnInit() {
    if (localStorage.getItem('jwt') == null) {
      this.router.navigate(['/login']);
    } else {
      this.employeeService.showEmployees().subscribe(
        (data: any) => {
          this.initErrorFlag = false;
          this.employeeList = data.employees;
        },
        err => {
          this.initErrorFlag = true;
        }
      );
    }
  }

  openAddModel(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  addEmployee() {
    this.employeeService.addEmployee(this.employeeForm.value).subscribe(
      (data: any) => {
        this.addEmployeeErrorFlag = false;
        window.location.reload();
      },
      err => {
        this.addEmployeeErrorFlag = true;
      }
    );
  }

  openUpdateModel(editcontent, employee: any) {
    this.employeeEditForm = this.formBuilder.group({
      _id: [employee._id],
      firstName: [employee.firstName, Validators.required],
      lastName: [employee.lastName, Validators.required],
      mobile: [employee.mobile, Validators.required],
      address: [employee.address, Validators.required],
      dob: [employee.dob.toString().slice(0, 10), Validators.required]
    });
    this.modalService.open(editcontent, { size: 'lg' });
  }

  openUpdateConfirmation(updateContent) {
    this.modalService.open(updateContent);
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employeeEditForm.value).subscribe(
      data => {
        this.updateOperationErrorFlag = false;
        window.location.reload();
      },
      err => {
        this.updateOperationErrorFlag = true;
      }
    );
  }

  openDeleteConfirmation(deleteContent, employee: any) {
    this.employeeId = employee._id;
    this.modalService.open(deleteContent);
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employeeId).subscribe(
      data => {
        this.operationErrorFlag = false;
        this.employeeId = '';
        window.location.reload();
      },
      err => {
        this.operationErrorFlag = true;
      }
    );
  }

  logoutManager() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('managerId');
    this.router.navigate(['/login']);
  }

}
