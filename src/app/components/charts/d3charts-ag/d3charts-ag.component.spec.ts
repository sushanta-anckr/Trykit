import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3chartsAgComponent } from './d3charts-ag.component';

describe('D3chartsAgComponent', () => {
  let component: D3chartsAgComponent;
  let fixture: ComponentFixture<D3chartsAgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D3chartsAgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3chartsAgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
