import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { QaDataService } from '../../../services/qaData/qa-data.service';

@Component({
  selector: 'app-infinte-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinte-table.component.html',
  styleUrl: './infinte-table.component.css'
})
export class InfinteTableComponent {
  items: any[] = []; // is an array that will store the loaded items (images).
  page = 1;// represents the current page number for pagination.
  perPage = 1; // represents the number of items to load per page.
  isLoading:boolean=false;

  constructor(private imageService: QaDataService) {}

  ngOnInit(): void {
    this.loadItems();
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
    this.imageService.getItems(this.page, this.perPage).subscribe((items) => {
      this.items.push(...items)
      console.log(items);
      this.page++
      this.isLoading=false
    });
  }


}
