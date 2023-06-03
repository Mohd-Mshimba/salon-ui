import { Customer } from 'src/app/modules/models/customer.model';
import { CustomerService } from 'src/app/modules/services/customer.service';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {
  submitForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private customerService: CustomerService,
    private swalService: SwalService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { item: Customer },
    private dialogRef: DialogRef<EditCustomerComponent>
  ) { }

  ngOnInit(): void {
    this.onCreate();
  }

  onCreate() {
    const data= this.data.item;
    this.submitForm = new FormGroup({
      id: new FormControl(data.id),
      firstName: new FormControl(data.firstName, [Validators.required]),
      lastName: new FormControl(data.lastName, [Validators.required]),
      middleName: new FormControl(data.middleName, [Validators.required]),
      email: new FormControl(data.email, [Validators.required]),
      phoneNumber: new FormControl(data.phoneNumber, [Validators.required]),
      street: new FormControl(data.street, [Validators.required]),
      city: new FormControl(data.city, [Validators.required]),
      zipCode: new FormControl(data.zipCode, [Validators.required]),
      state: new FormControl(data.state, [Validators.required]),
      status: new FormControl(data.status),
      gender: new FormControl(data.gender, [Validators.required]),
    })
  }

  onSubmit() {
    this.loading = true;
    const id = this.submitForm.value.id;
    const submitForm = this.submitForm.value;
    this.customerService.update(id, submitForm).subscribe({
      next: (data) => {
        this.swalService.successNotification("Data Successfully Updated");
        this.reload();
        this.dialogRef.close();
      },
      error: (error) => {
        this.swalService.successNotification("Data Fail Updated")
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
