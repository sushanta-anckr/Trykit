import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QaDataService {
  pendingReq: boolean = false;
  // apiUrls: string = 'https://api.pexels.com/v1/curated';
  constructor(private http: HttpClient) { }

  getData(limit: number, page: number): Observable<any[]> {
    const filter = {
      limit: limit,
    };

    const headers = new HttpHeaders({
      'Authorization': `BLUEruqBnvGLIwFHpd98OE2LrYIK4WgKBrxoEfA9UfdtM01E77zW7x7ulkemCRuz`
    });
    const apiUrl = `https://qa.api.turfassistant.com/api/expenseCredits?filter=${encodeURIComponent(JSON.stringify(filter))}`;
    return this.http.get<any[]>(apiUrl,{headers});
  }

  private apiUrl = 'https://picsum.photos/v2/list';


  getDatas(page: number, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getItems(page: number, perPage: number) {
    // if (this.pendingReq) {
    //   return {} as Observable<{}>;
    // }
    // this.pendingReq = true;
    const url = `${this.apiUrl}?per_page=${perPage}&page=${page}`;
    // this.pendingReq = false;
    return this.http.get<any>(url).pipe(delay(3000));
  }
}
