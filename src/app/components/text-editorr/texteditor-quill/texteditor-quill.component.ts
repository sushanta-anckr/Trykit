import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import Quill from 'quill';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import hljs from 'highlight.js'
import { HelloComponent } from '../text-editor/hello.component';

@Component({
  selector: 'app-texteditor-quill',
  standalone: true,
  imports: [CommonModule,HelloComponent,FormsModule,QuillModule],
  templateUrl: './texteditor-quill.component.html',
  styleUrl: './texteditor-quill.component.css'
})
export class TexteditorQuillComponent{
  constructor(){
    this.html = JSON.parse(localStorage.getItem('draft')as any); 
  }
  html = '';
  tools = {
      // imageResize: {},
      syntax: {
      highlight: (text:any) => hljs.highlightAuto(text).value
    },
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],                                        // remove formatting button
    ['link', 'image', 'video']                         // link and image, video
  ]
};

  localSave(){
    localStorage.setItem('draft', JSON.stringify(this.html) );
  }

}
