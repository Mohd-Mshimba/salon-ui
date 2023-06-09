import { AuthServices } from './../../../auth/services/auth-services';
import { CustomerService } from 'src/app/modules/services/customer.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  submitForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private customerService: CustomerService,
    private authServices: AuthServices,
    private swalService: SwalService,
    private router: Router,
    private dialogRef: DialogRef<AddCustomerComponent>
  ) { }

  ngOnInit(): void {
    this.onCreate();
  }

  onCreate() {
    this.submitForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      middleName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      status: new FormControl(1),
      zipCode: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
    })
  }

  onSubmit() {
    this.loading = true;
    const submitForm = this.submitForm.value;
    let loginData = {
      username: `${this.submitForm.value.email}`,
      password: `${'12345'}`,
      roles: `${'customer'}`
    };
    this.customerService.add(submitForm).subscribe({
      next: (data) => {
        this.authServices.add(loginData).subscribe({
          next: () => {
            this.swalService.successNotification("Data Successfully Created");
            this.reload();
            this.dialogRef.close();
          },
          error: () => {
            this.swalService.successNotification("Data Fail Created")
          },
          complete: () => this.loading = false,
        })
      },
      error: (error) => {
        this.swalService.successNotification("Data Fail Created")
      },
      complete: () => this.loading = false,
    })
  }

  reload() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/resources/customer']);
    });
  }

}
