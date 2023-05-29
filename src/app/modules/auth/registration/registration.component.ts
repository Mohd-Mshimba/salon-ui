import { SwalService } from './../../shared/swal.service';
import { CustomerService } from './../../services/customer.services';
import { AuthServices } from './../services/auth-services';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  loading!: boolean;

  constructor(
    private router: Router,
    private authServices: AuthServices,
    private swalService: SwalService,
    private customerService: CustomerService,
  ) { }

  submitForm!: FormGroup;

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      middleName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phoneNumber: new FormControl("", Validators.required),
      street: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      zipCode: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
    })
  }

  onCreate() {
    this.loading = true;
    if (this.submitForm.valid) {
      const data = this.submitForm.value;
      let loginData = {
        username: `${this.submitForm.value.email}`,
        password: `${'12345'}`,
        roles: `${'customer'}`
      };
      this.customerService.add(data).subscribe({
        next: () => {
          this.loading = false;
          this.authServices.add(loginData).subscribe({
            next: (res) => {
              this.swalService.successNotification("Customer record added successfully!");
              this.router.navigate(['']);
            },
            error: () => {
              this.swalService.errorNotification("login user wa're not created!");
              this.loading = false;
            },
          });
        },
        error: () => {
          this.swalService.errorNotification("Customer wa're not created!");
          this.loading = false;
        },
      });
    }
  }

}
