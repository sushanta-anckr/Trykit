import { Component } from '@angular/core';
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-ngx-sooner',
  standalone: true,
  imports: [NgxSonnerToaster],
  templateUrl: './ngx-sooner.component.html',
  styleUrl: './ngx-sooner.component.css'
})
export class NgxSoonerComponent {
  // protected readonly toast = toast;

  showToast(message:string){
toast.success(message)
  }
}
