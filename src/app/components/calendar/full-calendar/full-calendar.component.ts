import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-calendar.component.html',
  styleUrl: './full-calendar.component.css'
})
export class FullCalendarComponent {

  currentMonth!: number;  // Store month as a number
  currentYear!: number;
  daysArray: any[] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  constructor() { }

  ngOnInit() {
    this.renderCalendar(DateTime.local());
  }

  renderCalendar(date: DateTime) {
    this.currentMonth = date.month;
    this.currentYear = date.year;
  
    // Start and end of the month
    const startOfMonth = date.startOf('month');
    const endOfMonth = date.endOf('month');
  
    // Weekday of the first day of the month (0 = Sunday, 1 = Monday, ...)
    const firstDayOfMonth = startOfMonth.weekday % 7;
  
    // Total days in the current month
    const daysInMonth = endOfMonth.day;
  
    // Clear the days array
    this.daysArray = [];
  
    // Add padding for the days before the start of the month (leading blank days)
    for (let i = 0; i < firstDayOfMonth; i++) {
      this.daysArray.push({ date: '', isCurrentMonth: false }); // Blank days
    }
  
    // Add all the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      this.daysArray.push({ date: i, isCurrentMonth: true });
    }
  
    // Calculate the number of days left in the week after the last day of the month
    const lastDayOfMonthWeekday = endOfMonth.weekday % 7;
    const trailingBlankDays = 6 - lastDayOfMonthWeekday;
  
    // Add trailing blank days (to fill the last row of the calendar)
    for (let i = 0; i < trailingBlankDays; i++) {
      this.daysArray.push({ date: '', isCurrentMonth: false });
    }
    }

  // Function to handle previous month click
  prevMonth() {
    const newDate = DateTime.local(this.currentYear, this.currentMonth).minus({ months: 1 });
    this.renderCalendar(newDate);
  }

  // Function to handle next month click
  nextMonth() {
    const newDate = DateTime.local(this.currentYear, this.currentMonth).plus({ months: 1 });
    this.renderCalendar(newDate);
  }

  // Getter to display the current month name
  get currentMonthName(): string {
    return DateTime.local(this.currentYear, this.currentMonth).toFormat('MMMM');
  }

  // TrackBy function for *ngFor to ensure smooth DOM updates
  trackByDay(index: number, item: any): number {
    return index;
  }
  onDaySelect(day: any) {
    if (day.isCurrentMonth) {
      console.log('Selected date:', day.date);
    }
  }

}
