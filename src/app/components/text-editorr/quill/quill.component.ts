//app.component.ts

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import Quill from "quill";

@Component({
  selector: 'app-quill',
  standalone: true,
  imports: [],
  templateUrl: './quill.component.html',
  styleUrl: './quill.component.css'
})
export class QuillComponent implements OnInit {
    @ViewChild("editorContainer", { static: true })
    editorContainer: ElementRef | null = null;

    editor: Quill | undefined;

    ngOnInit() {

        const icons:any = Quill.import('ui/icons');
        icons['undo'] = `<svg viewbox="0 0 18 18">
        <polygon class="ql-fill ql-stroke" points="6 2 2 6 6 10 6 7 13 7 13 5 6 5 6 2" stroke-width="0.7"></polygon>
    </svg>`;
    icons['redo'] = `<svg viewbox="0 0 18 18">
        <polygon class="ql-fill ql-stroke" points="12 2 16 6 12 10 12 7 5 7 5 5 12 5 12 2" stroke-width="0.5"></polygon>
    </svg>`;

        // this.editor?.history.undo()
        // this.editor?.history.redo()
        if (this.editorContainer) {
            try {
                this.editor = new Quill(this.editorContainer.nativeElement, {
                    modules: {
                        toolbar: {
                            container:[
                                [{ header: [1, 2,3,4, false]}],
                                [{ font: [], }],
                                ["bold", "italic", "underline", "strike"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["link", "image"],
                                [{ align: [] }],
                                [{ color: [] }, { background: [] }],
                                [{ indent: '-1' }, { indent: '+1' }], 
                                ["clean"],
                                ["undo", "redo"], // Undo and Redo buttons
                              
                                
                            ],
                            handlers: {
                                undo: () => this.editor?.history.undo(),
                                redo: () => this.editor?.history.redo(),
                                // toogleMenu()=>
                            }
                        },
                    },
                    placeholder:"Write here...",
                    theme: "snow",
                    
                });
            } catch (error) {
                console.error("Error creating Quill editor:", error);
            }
        } else {
            console.error("Element with #editorContainer not found!");
        }
    }

    getEditorContent() {
        if (this.editor) {
            return this.editor.root.innerHTML;
        }
        return "";
    }


}
