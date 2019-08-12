import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/services/manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private managerService: ManagerService, private router: Router) { }

  managerLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  errorFlag = false;

  ngOnInit() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('managerId');
  }

  onLogin() {
    this.managerService.loginManager(this.managerLogin.value).subscribe(
      (data: any) => {
        this.errorFlag = false;
        localStorage.setItem('managerId', data._id);
        localStorage.setItem('jwt', data.jwt);
        this.router.navigate(['/home']);
      }, error => {
        this.errorFlag = true;
      }
    );
  }
}
