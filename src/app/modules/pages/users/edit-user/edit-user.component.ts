import { AuthServices } from './../../../auth/services/auth-services';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/modules/services/role.service';
import { Role } from 'src/app/modules/models/role.model';
import { EmployeeService } from 'src/app/modules/services/employee.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/modules/models/employee.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  submitForm!: FormGroup;
  loading: boolean = false;
  roles: Role[] = [];

  constructor(
    private employeeService: EmployeeService,
    private authServices: AuthServices,
    private roleService: RoleService,
    private swalService: SwalService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { item: Employee },
    private dialogRef: DialogRef<EditUserComponent>
  ) { }

  ngOnInit(): void {
    this.onUpdate();
    this.getAllRole(0, 10);
  }

  getAllRole(page: number, size: number) {
    this.roleService.getAll(page, size).subscribe({
      next: (res: any) => {
        this.roles = res;
      },
      error: () => {
        this.swalService.successNotification("Roles we're not found")
      },
      complete: () => this.loading = false,
    });
  }

  onUpdate() {
    const data = this.data.item;
    this.submitForm = new FormGroup({
      id: new FormControl(data.id, [Validators.required]),
      firstName: new FormControl(data.firstName, [Validators.required]),
      lastName: new FormControl(data.lastName, [Validators.required]),
      middleName: new FormControl(data.middleName, [Validators.required]),
      email: new FormControl(data.email, [Validators.required]),
      phoneNumber: new FormControl(data.phoneNumber, [Validators.required]),
      city: new FormControl(data.city, [Validators.required]),
      gender: new FormControl(data.gender, [Validators.required]),
      status: new FormControl(1),
      roles: new FormControl(data.roles.id, [Validators.required]),
    })
  }

  onSubmit() {
    this.loading = true;
    const submitForm = this.submitForm.value;
    const id = this.submitForm.value.id;
    const requestData = {
      ...submitForm,
      roles: {
        id: submitForm.roles,
        roleName: '',
        description: '',
      }
    }
    delete requestData.roleName;

    this.employeeService.update(id, requestData).subscribe({
      next: () => {
        this.swalService.successNotification("Data Successfully Created");
        this.reload();
        this.dialogRef.close();
      },
      error: (error) => {
        this.swalService.successNotification("Data Fail Created")
      },
      complete: () => this.loading = false,
    })
  }

  reload() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/resources/users']);
    });
  }

}
