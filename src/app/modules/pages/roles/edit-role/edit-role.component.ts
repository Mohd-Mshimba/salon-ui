import { RoleService } from './../../../services/role.service';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/modules/models/role.model';
@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent {
  submitForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private roleService: RoleService,
    private swalService: SwalService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:{item:Role},
    private dialogRef: DialogRef<EditRoleComponent>
  ) { }

  ngOnInit(): void {
    this.onCreate();
  }

  onCreate() {
    const data = this.data.item;
    this.submitForm = new FormGroup({
      id: new FormControl(data.id, [Validators.required]),
      roleName: new FormControl(data.roleName, [Validators.required]),
      description: new FormControl(data.description, [Validators.required])
    })
  }

  onSubmit() {
    this.loading = true;
    const id = this.submitForm.value.id;
    const submitForm = this.submitForm.value;

    this.roleService.update(id, submitForm).subscribe({
      next: () => {
        this.swalService.successNotification("Role Successfully Update");
        this.reload();
        this.dialogRef.close();
      },
      error: (error) => {
        this.swalService.successNotification("Data Fail Update")
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
