import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from '../_services/doctor.service';

@Component({
  selector: 'app-doctor-patients-list',
  templateUrl: './doctor-patients-list.component.html',
  styleUrls: ['./doctor-patients-list.component.css']
})
export class DoctorPatientsListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['username','fullName', 'age', 'sex', 'height', 'weight', 'allergies'];
  patients: any[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private doctorService: DoctorService) {
    this.dataSource = new MatTableDataSource<any>(this.patients);
  }

  ngOnInit(): void {
    this.getPatients();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getPatients() {
    this.doctorService.getPatients().subscribe(
      (data: any) => {
        this.patients = data;
       this.dataSource.data = this.patients;
        console.log(this.patients);
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }
}
