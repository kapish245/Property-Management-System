import { Property } from './interfaces/property';
import { PropertyApiService } from './services/property-api.service';
import { AddPropertyDialogComponent } from './add-property-dialog/add-property-dialog.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface DialogData {
  test: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pms-client';

  displayedColumns: string[] = [
    '_id',
    'name',
    'description',
    'size',
    'actions',
  ];
  dataSource!: MatTableDataSource<Property>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private propertyApiService: PropertyApiService
  ) {}

  ngOnInit(): void {
    this.getAllPropertyData();
  }
  openDialog() {
    this.dialog
      .open(AddPropertyDialogComponent, {
        width: '35%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'AddedProperty') {
          this.getAllPropertyData();
        }
      });
  }

  getAllPropertyData() {
    this.propertyApiService.getAllProperty().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error(err) {
        console.error(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProperty(row: any) {
    this.dialog.open(AddPropertyDialogComponent, {
      width: '35%',
      data: row,
    }).afterClosed()
    .subscribe((value) => {
      if (value === 'updatedProperty') {
        this.getAllPropertyData();
      }
    });
  }
  deleteProperty(id: String) {
    this.propertyApiService.deleteProperty(id)
    .subscribe({
      next:(value)=>{
        alert("property Deleted Successfully");
        this.getAllPropertyData();
      },
      error:(err)=>{
        alert(err.message);
      }
    })
  }
}
