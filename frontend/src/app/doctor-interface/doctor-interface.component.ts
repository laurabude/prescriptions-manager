import { Component, OnInit } from '@angular/core';
import { CalendarEvent, MonthViewDay } from 'calendar-utils';
import { DoctorService } from '../_services/doctor.service';

@Component({
  selector: 'app-doctor-interface',
  templateUrl: './doctor-interface.component.html',
  styleUrls: ['./doctor-interface.component.css']
})
export class DoctorInterfaceComponent implements OnInit {
  selectedPatient: string = ''; // Define selectedPatient property
  medication: string = ''; // Define medication property
  dosage: string = ''; // Define dosage property
  time:string='';
  days:number;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  selectedDates: Date[] = [];
  patients: any[] = [];
  dayModifiers: any[] = [];
  prescriptions: any[] = [];

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getPatients();
    this.getPrescriptions();
  }

  getPatients() {
    this.doctorService.getPatients().subscribe(
      (data: any) => {
        this.patients = data;
        console.log(this.patients);
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }
  getPrescriptions() {
    this.doctorService.getPrescriptions().subscribe(
        (data: any) => {
            this.prescriptions = data;
            console.log(this.prescriptions);
        },
        (error) => {
            console.error('Error fetching prescriptions:', error);
        }
    );
}

  setPrescription() {
    var form = {
      username : this.selectedPatient,
      medication: this.medication,
      dosage: this.dosage,
      time: this.time,
      days: this.days
    }
    this.doctorService.setPrescription(form).subscribe(
      (data:any) => {
        window.location.reload();
      }
    )
  }

  deletePrescription(id:any) {
    this.doctorService.deletePrescription(id).subscribe(
      (data:any) => {
        this.getPrescriptions();
      }
    )
  }

  onDayClicked(day: { day: MonthViewDay<any>; sourceEvent: MouseEvent | KeyboardEvent }): void {
    const clickedDate = day.day.date;

    // Toggle the selection status of the date
    if (this.isSelectedDate(clickedDate)) {
      this.selectedDates = this.selectedDates.filter(date => date.toDateString() !== clickedDate.toDateString());
    } else {
      this.selectedDates.push(clickedDate);
    }
  }
  
  isSelectedDate(date: Date): boolean {
    return this.selectedDates.some(selectedDate => selectedDate.toDateString() === date.toDateString());
  }

}
