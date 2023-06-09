import { CustomerService } from 'src/app/modules/services/customer.service';
import { Customer } from 'src/app/modules/models/customer.model';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { AuthServices } from 'src/app/modules/auth/services/auth-services';
@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent {

  dataSource!: MatTableDataSource<any>;
  displayedColumns = ['id','fullname','gender','email','phoneNumber','street','city','state','zipCode','status','action'];

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
    private customerService: CustomerService,
    public dialog: MatDialog,
    private authServices:AuthServices,
    private swalService:SwalService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAll(0, 10);
  }

  getAll(page: number, size: number) {
    this.customerService.getAll(page, size).subscribe({
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
    const dialogRef = this.dialog.open(AddCustomerComponent, options);
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
        this.customerService.delete(id).subscribe({
          next: () => {
            this.swalService.successNotification("Customer Successfully deleted");
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
    const dialogRef = this.dialog.open(EditCustomerComponent, options);
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
