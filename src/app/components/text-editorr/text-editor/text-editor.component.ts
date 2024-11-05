import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import  DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { HelloComponent } from './hello.component';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [CommonModule,CKEditorModule,FormsModule,HelloComponent],
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent {
  
  name = "Angular";
  editor = DecoupledEditor;
  data = `<p>Hello, world!</p>`;

  onReady(editor:any) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }
  print() {
    alert(this.data)
  }
}
