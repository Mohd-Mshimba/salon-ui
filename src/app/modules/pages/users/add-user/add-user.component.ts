import { AuthServices } from './../../../auth/services/auth-services';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/modules/services/role.service';
import { Role } from 'src/app/modules/models/role.model';
import { EmployeeService } from 'src/app/modules/services/employee.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  submitForm!: FormGroup;
  loading: boolean = false;
  roles: Role[] = [];

  constructor(
    private employeeService: EmployeeService,
    private authServices: AuthServices,
    private roleService: RoleService,
    private swalService: SwalService,
    private router: Router,
    private dialogRef: DialogRef<AddUserComponent>
  ) { }

  ngOnInit(): void {
    this.onCreate();
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

  onCreate() {
    this.submitForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      middleName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      status: new FormControl(1),
      roles: new FormControl("", [Validators.required]),
    })
  }

  onSubmit() {
    this.loading = true;
    const submitForm = this.submitForm.value;
    const requestData = { ...submitForm,
      roles:{
        id:submitForm.roles,
        roleName:'',
        description:'',
      }
    }
    delete requestData.roleName;

    let loginData = {
      username: `${this.submitForm.value.email}`,
      password: `${'12345'}`,
      roles: `${'admin'}`
    };

    this.employeeService.add(requestData).subscribe({
      next: () => {
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
      this.router.navigate(['/resources/users']);
    });
  }

}
