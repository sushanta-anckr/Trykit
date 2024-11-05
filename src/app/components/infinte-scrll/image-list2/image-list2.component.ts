import { Component } from '@angular/core';
import { QaDataService } from '../../../services/qaData/qa-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-list2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-list2.component.html',
  styleUrl: './image-list2.component.css'
})
export class ImageList2Component {
  items: any[] = [];
  page = 1;
  perPage = 1;
  isLoading: boolean = false;
  constructor(private imageService: QaDataService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.isLoading = true;
    this.imageService.getItems(this.page, this.perPage).subscribe((items) => {
      this.items.push(...items);
      console.log(items);
      this.page++;
      this.isLoading = false;
    });
  }
}
