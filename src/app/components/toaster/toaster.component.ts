import { Component } from '@angular/core';
import { SoonerService } from '../../services/sooner/sooner.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent {

  // constructor(private toastService:SoonerService){}
  // showToast(){
  //   this.toastService.show('This is toast message!')
  // }
}
