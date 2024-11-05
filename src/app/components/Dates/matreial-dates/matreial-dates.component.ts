import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
// Angular

// Moment
import moment from 'moment';
import { CustomDateAdapter } from '../../../services/date-time/customDateAdapter';
import { CUSTOM_LUXON_DATE_FORMATS, CustomLuxonDateAdapter } from '../../../services/date-time/customLuxon';
import { DateTime } from 'luxon';
@Component({
  selector: 'app-matreial-dates',
  standalone: true,
  imports: [  CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    TranslateModule ],
    providers: [
      { provide: DateAdapter, useClass: CustomLuxonDateAdapter },
      { provide: MAT_DATE_FORMATS, useValue: CUSTOM_LUXON_DATE_FORMATS },
      { provide: MAT_DATE_LOCALE, useValue: 'en-US' }, // Set your desired locale
    ],
  templateUrl: './matreial-dates.component.html',
  styleUrl: './matreial-dates.component.css'
})
export class MatreialDatesComponent implements OnInit{

  public value: moment.Moment=moment();

  public constructor()
  {
    console.log("Date-Picker.component - ctor");
  }
  onDateChange(date: DateTime | null): void {
    console.log('Selected date:', date);
  }

  ngOnInit(): void
  {
    this.value = moment();
  }
}
