import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private formBuilder: FormBuilder, private managerService: ManagerService, private router: Router) { }

  managerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    address: ['', Validators.required],
    dob: ['', Validators.required],
    company: ['', Validators.required]
  });
  errorFlag = false;

  onRegister() {
    console.log(this.managerForm.value);
    this.managerService.registerManager(this.managerForm.value).subscribe(
      (data: any) => {
        this.errorFlag = false;
        this.router.navigate(['/login']);
      }, error => {
        this.errorFlag = true;
        console.log(error);
      }
    );
  }

}
