import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import moment from 'moment'; 
import {DateTime} from 'luxon'
@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    OverlayModule,
    TranslateModule
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
})
export class DatePickerComponent {
  selectedDate: string = '';
  formattedDate: string = '';
  dpSetting!: {
    format: any;
    showWeekNumbers: boolean;
    appendTo: string;
    locale: string;
  };

  constructor(public translateService: TranslateService) {
    this.initialFunc();
  }

  initialFunc() {
   const  datePickerFormat: string='MM-DD-YYYY';

    this.selectedDate = DateTime.now().toFormat(datePickerFormat);

    this.dpSetting = {
      format: datePickerFormat,
      showWeekNumbers: false,
      appendTo: 'body',
      locale:
        this.translateService.currentLang == 'sp'
          ? 'es'
          : this.translateService.currentLang,
    };
  }

  // Whenever the selected date changes
  onDateChange() {
    if (this.selectedDate) {
      // Format or manipulate the date as needed
      console.log('Selected Date:', this.selectedDate);
      this.formattedDate = this.selectedDate; // Placeholder for further manipulation
    }
  }
}
