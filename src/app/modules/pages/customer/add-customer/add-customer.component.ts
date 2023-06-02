import { CustomerService } from 'src/app/modules/services/customer.services';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/modules/shared/swal.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  submitForm!: FormGroup;

  constructor(
    private customerService:CustomerService,
    private swalService:SwalService,
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
      zipCode: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
    })
  }

  onSubmit() {
    if (!this.submitForm.invalid) {
      const submitForm = this.submitForm.value;
      this.customerService.add(submitForm).subscribe({
        next: (data) => {
          this.swalService.successNotification("Data Successfully Created")
        },
        error: (error) => {
          this.swalService.successNotification("Data Fail Created")
        },
        // complete: () => this.spinner.hide(),
      })
    }

  }

}
