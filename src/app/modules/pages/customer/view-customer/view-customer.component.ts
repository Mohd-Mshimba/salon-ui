import { CustomerService } from 'src/app/modules/services/customer.services';
import { Customer } from 'src/app/modules/models/customer.model';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { Router } from '@angular/router';
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
  totalProduct: number = 0;
  loading:boolean=false
  roles!:String|null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
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
        this.totalProduct = this.filteredItems;
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
      width: '30%',
      disableClose: true,
    };
    const dialogRef = this.dialog.open(AddCustomerComponent, options);
  }


  onEdit(item: Customer) {
    const options = {
      data: {
        item: item,
      },
      width: '30%',
      disableClose: true,
    };
    const dialogRef = this.dialog.open(EditCustomerComponent, options);
  }

  clearTableData() {
    this.dataSource.data = [];
    this.filteredItems = 0;
    this.totalProduct = 0;
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
