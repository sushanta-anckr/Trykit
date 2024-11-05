import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexteditorQuillComponent } from './texteditor-quill.component';

describe('TexteditorQuillComponent', () => {
  let component: TexteditorQuillComponent;
  let fixture: ComponentFixture<TexteditorQuillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TexteditorQuillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TexteditorQuillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
