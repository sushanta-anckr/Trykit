import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KolkovEditorComponent } from './kolkov-editor.component';

describe('KolkovEditorComponent', () => {
  let component: KolkovEditorComponent;
  let fixture: ComponentFixture<KolkovEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KolkovEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KolkovEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
