import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxonComponent } from './luxon.component';

describe('LuxonComponent', () => {
  let component: LuxonComponent;
  let fixture: ComponentFixture<LuxonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuxonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuxonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
