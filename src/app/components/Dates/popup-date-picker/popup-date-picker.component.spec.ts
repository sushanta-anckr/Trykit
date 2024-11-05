import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDatePickerComponent } from './popup-date-picker.component';

describe('PopupDatePickerComponent', () => {
  let component: PopupDatePickerComponent;
  let fixture: ComponentFixture<PopupDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
