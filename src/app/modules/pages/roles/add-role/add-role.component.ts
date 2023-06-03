import { RoleService } from './../../../services/role.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {
  submitForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private roleService: RoleService,
    private swalService: SwalService,
    private router: Router,
    private dialogRef: DialogRef<AddRoleComponent>
  ) { }

  ngOnInit(): void {
    this.onCreate();
  }

  onCreate() {
    this.submitForm = new FormGroup({
      roleName: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])
    })
  }

  onSubmit() {
    this.loading = true;
    const submitForm = this.submitForm.value;

    this.roleService.add(submitForm).subscribe({
      next: () => {
        this.swalService.successNotification("Role Successfully Created");
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
      this.router.navigate(['/resources/roles']);
    });
  }

}
