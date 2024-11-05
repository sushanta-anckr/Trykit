import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';


interface DataType {
  id: number;
  name: string;
  download_url: string;
}

@Component({
  selector: 'app-infinite-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinite-image.component.html',
  styleUrl: './infinite-image.component.css'
})
export class InfiniteImageComponent {
  data: DataType[] = [];
  page: number = 1;
  loading: boolean = false;
  @ViewChild('loader') loader!: ElementRef;

  private observer!: IntersectionObserver;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.firstPage();
    this.setupIntersectionObserver();
  }


  private async firstPage() {
    await this.fetchData(1);
  }

  private async fetchData(page: number) {
    this.loading = true;
    const url = `https://picsum.photos/v2/list?page=${page}&limit=9`;
    try {
      const datas: any= await this.http.get<DataType[]>(url).toPromise();
      this.data.push(...datas);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
      this.page++;
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        this.loadMore();
      }
    });

    this.observer.observe(this.loader.nativeElement);
  }

  private loadMore() {
    if (!this.loading) {
      this.fetchData(this.page);
    }
  }

}
