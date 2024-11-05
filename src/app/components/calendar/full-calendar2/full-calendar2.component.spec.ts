import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCalendar2Component } from './full-calendar2.component';

describe('FullCalendar2Component', () => {
  let component: FullCalendar2Component;
  let fixture: ComponentFixture<FullCalendar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCalendar2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullCalendar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
