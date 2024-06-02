// medication-calendar.component.ts

import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { addDays, startOfDay, isSameDay } from 'date-fns';
import { DoctorService } from '../_services/doctor.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit{
  viewDate: Date = new Date(); // Current date
  activeDayIsOpen: boolean = true;

  medications: any[] = [];

  medicationEvents: CalendarEvent[] = [];

  constructor(private doctorService:DoctorService) {
    this.updateCalendarEvents();
  }

  ngOnInit(): void {
    this.doctorService.getMedicationForUser("laura").subscribe(
      (data:any) =>{
        data.forEach(medication => {
          this.medications.push({name:medication.medication,dosage:medication.dosage,time:medication.time,days:medication.days});
          this.updateCalendarEvents();
        })
      }
    )
  }

  updateCalendarEvents(): void {
    this.medicationEvents = [];

    this.medications.forEach((medication, index) => {
      medication.days.forEach((day) => {
        const event: CalendarEvent = {
          start: addDays(startOfDay(this.viewDate), day - 1),
          title: `${medication.name} - ${medication.dosage} - ${medication.time}`,
          color: { primary: '#1e90ff', secondary: '#D1E8FF' },
          meta: { medicationIndex: index },
        };

        this.medicationEvents.push(event);
      });
    });
  }

  onDayClicked({ day }: { day: CalendarMonthViewDay }): void {
    if (isSameDay(this.viewDate, day.date)) {
      this.activeDayIsOpen = !this.activeDayIsOpen;
    } else {
      this.viewDate = day.date;
      this.activeDayIsOpen = true;
    }
  }

  onEventClicked({ event }: { event: CalendarEvent }): void {
    const medicationIndex = event.meta.medicationIndex;
    const medication = this.medications[medicationIndex];
    console.log('Medication Clicked:', medication);
  }

  onEventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    console.log('Event Times Changed:', event, newStart, newEnd);
  }
}
