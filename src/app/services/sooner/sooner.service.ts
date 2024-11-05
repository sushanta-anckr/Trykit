import { Injectable } from '@angular/core';
import { toast,ToasterProps } from 'sonner'

@Injectable({
  providedIn: 'root'
})
export class SoonerService {

  constructor() { }

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
   toast(message)
  }

}
