import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/modules/services/appointment.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent {
  submitForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private swalService: SwalService,
    private router: Router,
    private dialogRef: DialogRef<AddAppointmentComponent>
  ) { }

  ngOnInit(): void {
    this.onCreate();
  }

  onCreate() {
    this.submitForm = new FormGroup({
      status: new FormControl('1'),
      appointmentDate: new FormControl(new Date()),
      appointmentName: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    })
  }

  onSubmit() {
    const id = localStorage.getItem("id");
    this.loading = true;
    const data = this.submitForm.value;
    const requestBody = {
      appointmentDate: data.appointmentDate,
      description: data.description,
      appointmentName: data.appointmentName,
      status: data.status,
      customer: {
        id: id,
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
    this.appointmentService.add(requestBody).subscribe({
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
