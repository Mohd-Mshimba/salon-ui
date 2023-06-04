import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DocumentsService } from 'src/app/modules/services/documents.service';
import { SwalService } from 'src/app/modules/shared/swal.service';
import { AddDocumentComponent } from '../add-document/add-document.component';
import { EditDocumentComponent } from '../edit-document/edit-document.component';
import { PreviewDocumentComponent } from '../preview-document/preview-document.component';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent {

  dataSource!: MatTableDataSource<any>;
  displayedColumns = ['id','name','description','documentFile','action'];

  filteredItems: number = 0;
  pageSize: number = 0;
  reportDataLoaded: boolean = false;
  reportObject: any = null;
  totalData: number = 0;
  loading: boolean = false
  roles!: String | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private documentsService: DocumentsService,
    public dialog: MatDialog,
    private swalService: SwalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getAll(0, 10);
  }

  getAll(page: number, size: number) {
    this.documentsService.getAll(page, size).subscribe({
      next: (res: any) => {
        const data = res;
        this.dataSource = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        this.clearReportData();
      },
      error: () => {
        this.clearTableData();
        this.clearReportData();
      },
      complete: () => this.loading = false,
    });
  }

  onAttachment(item: Document) {
    const options = {
      data: {
        item: item,
      },
      width: '60%',
      disableClose: true,
    };
    const dialogRef = this.dialog.open(PreviewDocumentComponent, options);
  }

  onCreate() {
    const options = {
      width: '35%',
      disableClose: true,
    };
    const dialogRef = this.dialog.open(AddDocumentComponent, options);
  }

  onDelete(item: any) {
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
        this.documentsService.delete(id).subscribe({
          next: () => {
            this.swalService.successNotification("Documents Successfully deleted");
            this.getAll(0, 10);
          },
          error: () => {
            this.swalService.successNotification("Documents fail deleted");
          },
          complete: () => this.loading = false,
        });
      }
    })
  }


  onEdit(item: Document) {
    const options = {
      data: {
        item: item,
      },
      width: '35%',
      disableClose: true,
    };
    const dialogRef = this.dialog.open(EditDocumentComponent, options);
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
