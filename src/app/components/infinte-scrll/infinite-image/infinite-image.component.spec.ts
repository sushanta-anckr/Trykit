import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteImageComponent } from './infinite-image.component';

describe('InfiniteImageComponent', () => {
  let component: InfiniteImageComponent;
  let fixture: ComponentFixture<InfiniteImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfiniteImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
