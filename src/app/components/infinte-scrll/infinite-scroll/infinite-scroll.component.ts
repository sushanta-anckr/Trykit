import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { QaDataService } from '../../../services/qaData/qa-data.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [CommonModule,NgSelectModule,FormsModule],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.css'
})
export class InfiniteScrollComponent {

  constructor(private apiService: QaDataService) {}

  items: any[] = []; // is an array that will store the loaded items (images).
  page = 10;// represents the current page number for pagination.
  limit = 15; // represents the number of items to load per page.
  isLoading:boolean=false;
  search$ = new Subject<string>();
  selectedItem: any;

  ngOnInit() {
   this.loadItems()
  }

  @HostListener('window:scroll',['$event'])
  onWindowScroll(event:any){
    
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight&&!this.isLoading){
      console.log(event);
      this.loadItems()
    }
  }


  loadItems() {
    this.isLoading=true;
    this.apiService.getData(this.limit,this.page).subscribe((items) => {
      this.items.push(...items)
      console.log(items);
      this.page++
      this.isLoading=false
    });
  }



}
