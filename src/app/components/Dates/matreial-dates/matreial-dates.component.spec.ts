import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatreialDatesComponent } from './matreial-dates.component';

describe('MatreialDatesComponent', () => {
  let component: MatreialDatesComponent;
  let fixture: ComponentFixture<MatreialDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatreialDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatreialDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
