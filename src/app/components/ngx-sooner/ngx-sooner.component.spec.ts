import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSoonerComponent } from './ngx-sooner.component';

describe('NgxSoonerComponent', () => {
  let component: NgxSoonerComponent;
  let fixture: ComponentFixture<NgxSoonerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSoonerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSoonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
