import { Injectable } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateTime } from 'luxon';

@Injectable()
export class CustomLuxonDateAdapter extends LuxonDateAdapter {
  public override format(date: DateTime, displayFormat: string): string {
    const locale = 'en-US';
    const format = 'MM-dd-yyyy'; // Adjust the format as needed

    return date.setLocale(locale).toFormat(format);
  }
}

export const CUSTOM_LUXON_DATE_FORMATS: MatDateFormats = {
    parse: {
      dateInput: 'MM-dd-yyyy',
    },
    display: {
      dateInput: 'MM-dd-yyyy',
      monthYearLabel: 'MMMM yyyy',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM yyyy',
    },
  };