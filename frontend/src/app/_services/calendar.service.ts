import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  // Mock events data
  private events: CalendarEvent[] = [
    {
      title: 'Event 1',
      start: new Date(),
      end: new Date(),
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
    },
    // Add more events as needed
  ];

  constructor() { }

  getEvents(): Observable<CalendarEvent[]> {
    // Simulate an asynchronous operation (e.g., fetching events from the server)
    return of(this.events);
  }
}
