import { ChangeDetectionStrategy, Component,Inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

export class MyFormat {
  value = 1;
  constructor() {}
  get display() {
    return this.value == 1
      ? {
          dateInput: 'MM-DD-YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      : {
          dateInput: 'DD-MM-YYYY',
          monthYearLabel: 'MM YYYY',
          dateA11yLabel: 'DD-MM-YYYY',
          monthYearA11yLabel: 'MM YYYY',
        };
  }
  get parse() {
    return this.value == 1
      ? {
          dateInput: 'YYYY-MM-DD',
        }
      : {
          dateInput: 'DD-MM-YYYY',
        };
  }
}
/** @title Datepicker with custom formats */

@Component({
  selector: 'app-popup-date-picker',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useClass: MyFormat }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './popup-date-picker.component.html',
  styleUrl: './popup-date-picker.component.css',
})
export class PopupDatePickerComponent {
  constructor(@Inject(MAT_DATE_FORMATS) private config: MyFormat) {}
  date: FormControl = new FormControl(new Date('2021-01-19'));
  change() {
    this.config.value = this.config.value == 1 ? 2 : 1;
    this.date = new FormControl(this.date.value);
  }
  isPopup=false;

  Popup(){
this.isPopup=true
  }
}
