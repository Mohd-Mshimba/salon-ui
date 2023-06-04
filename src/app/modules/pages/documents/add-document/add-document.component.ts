import { DocumentsService } from 'src/app/modules/services/documents.service';
import { AuthServices } from './../../../auth/services/auth-services';
import { CustomerService } from 'src/app/modules/services/customer.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/modules/services/appointment.service';
import { Appointment } from 'src/app/modules/models/appointment.model';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {
  submitForm!: FormGroup;
  loading: boolean = false;
  appointments: Appointment[] = [];
  fileObject: any = {};
  base64String!: string;
  customerId: any;

  constructor(
    private customerService: CustomerService,
    private appointmentService: AppointmentService,
    private swalService: SwalService,
    private documentsService: DocumentsService,
    private router: Router,
    private dialogRef: DialogRef<AddDocumentComponent>
  ) { }

  ngOnInit(): void {
    this.onCreate();
    this.customerId = localStorage.getItem("id"),
      this.getAllAppointment(0, 10);
  }

  onCreate() {
    this.submitForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      appointment: new FormControl("", [Validators.required]),
    })
  }

  // {
  //   "documentFile": "string",
  //   "name": "string",
  //   "description": "string"
  //   "appointment": {
  //     "id": 0,
  //     "appointmentDate": "2023-06-04T07:21:28.370Z",
  //     "description": "string",
  //     "appointmentName": "string",
  //     "status": "string",
  //     "customer": {
  //       "id": 0,
  //       "firstName": "string",
  //       "lastName": "string",
  //       "middleName": "string",
  //       "email": "string",
  //       "phoneNumber": "string",
  //       "street": "string",
  //       "city": "string",
  //       "state": "string",
  //       "status": 0,
  //       "zipCode": "string",
  //       "gender": "string"
  //     }
  //   },
  // }


  getAllAppointment(page: number, size: number) {
    this.appointmentService.getAll(page, size).subscribe({
      next: (res: any) => {
        this.appointments = res;
      },
      error: () => {
        this.swalService.errorNotification("Appointments we're not found")
      },
      complete: () => this.loading = false,
    });
  }

  onCertificateAttach(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64String = reader.result as string;
      this.base64String = base64String.substring(base64String.indexOf(',') + 1);
    };
  }

  onSubmit() {

    this.loading = true;
    const formData = this.submitForm.value;
    const submitForm = {
      documentFile: `${this.base64String}`,
      name: formData.name,
      description: formData.description,

      appointment: {
        id: formData.appointment,
        description: '',
        status: '',
        appointmentDate: '',
        appointmentName: '',

        customer: {
          id: this.customerId,
          firstName: '',
          lastName: '',
          middleName: '',
          email: '',
          phoneNumber: '',
          street: '',
          city: '',
          state: '',
          status: '',
          zipCode: '',
          gender: ''
        }
      }
    }

    this.documentsService.add(submitForm).subscribe({
      next: () => {
        this.swalService.successNotification("Documents Successfully Created");
        this.reload();
        this.dialogRef.close();
      },
      error: () => {
        this.swalService.errorNotification("Documents we're not Created")
      },
      complete: () => this.loading = false,
    })

  }

  reload() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/resources/document']);
    });
  }

}
