import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinteTableComponent } from './infinte-table.component';

describe('InfinteTableComponent', () => {
  let component: InfinteTableComponent;
  let fixture: ComponentFixture<InfinteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfinteTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfinteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
