import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-full-calendar2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-calendar2.component.html',
  styleUrl: './full-calendar2.component.css'
})
export class FullCalendar2Component {

  months: string[] = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  date: Date = new Date();
  currentMonth: number = this.date.getMonth();
  currentYear: number = this.date.getFullYear();
  days: Array<{ day: number, isActive: boolean, isInactive: boolean }> = [];

  renderCalendar(month: number, year: number) {
    this.days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    // Days from previous month
    for (let i = firstDay; i > 0; i--) {
      this.days.push({ day: prevLastDate - i + 1, isActive: false, isInactive: true });
    }

    // Current month days
    for (let i = 1; i <= lastDate; i++) {
      const isActive = i === this.date.getDate() && month === this.date.getMonth() && year === this.date.getFullYear();
      this.days.push({ day: i, isActive, isInactive: false });
    }
  }

  changeMonth(direction: number) {
    this.currentMonth += direction;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  ngOnInit() {
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

}
