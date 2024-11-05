import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipchartComponent } from './tooltipchart.component';

describe('TooltipchartComponent', () => {
  let component: TooltipchartComponent;
  let fixture: ComponentFixture<TooltipchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TooltipchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
