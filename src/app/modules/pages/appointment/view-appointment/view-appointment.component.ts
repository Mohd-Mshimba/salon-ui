
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppointmentService } from 'src/app/modules/services/appointment.service';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { AddAppointmentComponent } from '../add-appointment/add-appointment.component';
import { Appointment } from 'src/app/modules/models/appointment.model';
import { EditAppointmentComponent } from '../edit-appointment/edit-appointment.component';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns = ['id','description','appointmentDate','status','action'];

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
    private appointmentService: AppointmentService,
    public dialog: MatDialog,
    private swalService:SwalService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAll();
  }

  getAll() {
    const email = localStorage.getItem('username')
    this.appointmentService.getAppointmentByEmail(email).subscribe({
      next: (res: any) => {
        const data = res;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
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
    const dialogRef = this.dialog.open(AddAppointmentComponent, options);
  }

  onDelete(item: Appointment) {
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
        this.appointmentService.delete(id).subscribe({
          next: () => {
            this.swalService.successNotification("Appointment Successfully deleted");
            this.getAll();
          },
          error: () => {
            this.swalService.successNotification("Data Fail Created")
          },
          complete: () => this.loading = false,
        })
      }
    })
  }

  onEdit(item: Appointment) {
    const options = {
      data: {
        item: item,
      },
      width: '35%',
      disableClose: true,
    };
    const dialogRef = this.dialog.open(EditAppointmentComponent, options);
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
