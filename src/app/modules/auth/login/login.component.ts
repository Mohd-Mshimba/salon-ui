import { AuthServices } from './../services/auth-services';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authServices: AuthServices,
    private router:Router,
  ) { }

  submitForm!: FormGroup;

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  login() {
    const username = this.submitForm.value.username;
    const password = this.submitForm.value.password;
    this.authServices.login(username,password).subscribe({
      next: (res) => {
        localStorage.setItem("username",res.username)
        localStorage.setItem("roles",res.roles)
        if (res.roles=='customer') {
          this.router.navigate(['/dashboard']);
        }else if(res.roles=='admin'){
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        console.log("User we're not found");
      }
    });
  }
}
