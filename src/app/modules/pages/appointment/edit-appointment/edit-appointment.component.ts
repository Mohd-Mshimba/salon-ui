import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/modules/services/appointment.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/modules/models/appointment.model';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent {
  submitForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private swalService: SwalService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:{item:Appointment},
    private dialogRef: DialogRef<EditAppointmentComponent>
  ) { }

  ngOnInit(): void {
    this.onCreate();
  }

  onCreate() {
    const data = this.data.item
    this.submitForm = new FormGroup({
      id: new FormControl(data.id),
      appointmentDate: new FormControl(data.appointmentDate),
      description: new FormControl(data.description, [Validators.required]),
      status: new FormControl(data.status),
    })
  }

  onSubmit() {
    const customerId = localStorage.getItem("id");
    this.loading = true;
    const id = this.submitForm.value.id;
    const data = this.submitForm.value;
    const requestBody = {
      appointmentDate: data.appointmentDate,
      description: data.description,
      status: data.status,
      customer: {
        id: customerId,
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        street: '',
        city: '',
        state: '',
        status: '',
        zipCode: '',
        gender: '',
      }
    };
    this.appointmentService.update(id, requestBody).subscribe({
      next: () => {
        this.swalService.successNotification("Appointment Successfully Created");
        this.reload();
        this.dialogRef.close();
      },
      error: () => {
        this.swalService.successNotification("Appointment Fail Created")
      },
      complete: () => this.loading = false,
    })
  }

  reload() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/resources/appointment']);
    });
  }

}
