import { RoleService } from './../../../services/role.service';
import { CustomerService } from 'src/app/modules/services/customer.service';
import { Customer } from 'src/app/modules/models/customer.model';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { EditRoleComponent } from '../edit-role/edit-role.component';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns = ['id','roleNme','description','action'];

  filteredItems: number = 0;
  pageSize: number = 0;
  reportDataLoaded: boolean = false;
  reportObject: any = null;
  totalData: number = 0;
  loading:boolean=false
  roles!:String|null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private roleService: RoleService,
    public dialog: MatDialog,
    private swalService:SwalService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAll(0, 10);
  }

  getAll(page: number, size: number) {
    this.roleService.getAll(page, size).subscribe({
      next: (res: any) => {
        const totalItems = res.totalItems;
        const pageSize = res.pageSize;
        const data = res;
        this.dataSource = data;

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;

        this.filteredItems = totalItems;
        this.totalData = this.filteredItems;
        this.pageSize = pageSize;
        this.clearReportData();
      },
      error: (error: any) => {
        this.clearTableData();
        this.clearReportData();
      },
      complete: () => this.loading = false,
    });
  }

  onCreate() {
    const options = {
      width: '35%',
      disableClose: true,
    };
    const dialogRef = this.dialog.open(AddRoleComponent, options);
  }

  onDelete(item: Customer) {
    const id = item.id;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.roleService.delete(id).subscribe({
          next: () => {
            this.swalService.successNotification("Roles Successfully deleted");
            this.getAll(0,10);
          },
          error: () => {
            this.swalService.successNotification("Data Fail Created")
          },
          complete: () => this.loading = false,
        });
      }
    })
  }


  onEdit(item: Customer) {
    const options = {
      data: {
        item: item,
      },
      width: '35%',
      disableClose: true,
    };
    const dialogRef = this.dialog.open(EditRoleComponent, options);
  }

  clearTableData() {
    this.dataSource.data = [];
    this.filteredItems = 0;
    this.totalData = 0;
    this.pageSize = 0;
  }
  clearReportData() {
    this.reportObject = null;
    this.reportDataLoaded = false;
  }
  pageEvent(event: any) {
    let page = event.pageIndex;
    let size = event.pageSize;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
