import { Injectable, Optional, Inject } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateTime, Info } from 'luxon';

@Injectable()
export class LuxonDateAdapter extends DateAdapter<DateTime> {
  constructor(@Optional() @Inject(MAT_DATE_LOCALE) private matDateLocale: string) {
    super();
    this.setLocale(this.matDateLocale);
  }

  override parse(value: any, parseFormat: string | string[]): DateTime | null {
    if (typeof value === 'string' && value) {
      return DateTime.fromFormat(value, 'MM-dd-yyyy', { locale: this.matDateLocale });
    }
    return value ? DateTime.fromJSDate(value) : null;
  }

  override format(date: DateTime, displayFormat: string): string {
    return date.toFormat('MM-dd-yyyy');
  }

  // Override other necessary methods
  override toIso8601(date: DateTime): string {
    return date.toISO();
  }

  override isValid(date: DateTime): boolean {
    return date.isValid;
  }

  override toDate(date: DateTime): Date {
    return date.toJSDate();
  }

  override deserialize(value: any): DateTime | null {
    if (value) {
      return DateTime.fromISO(value);
    }
    return null;
  }
}
