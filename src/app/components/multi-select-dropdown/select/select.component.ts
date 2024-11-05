import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataService } from '../../../services/data.service';



@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,NgSelectModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit{

  people = ['Service Task', 'Quick Task', 'hey', 'hello'];
  selectedPeople:string[] = [];
  task:any[]=[]

  constructor(private dataService: DataService) {}
  ngOnInit() {



    
    this.task = this.people.map(task => ({ name: task }));

    this.selectedPeople = [this.task[0].name];
    
    this.selectAllForDropdownItems(this.task);
  }

  selectAllForDropdownItems(items: any[]) {
    let allSelect = (items:any) => {
      items.forEach((element:any) => {
        element['selectedAllGroup'] = 'selectedAllGroup';
      });
    };

    allSelect(items);
  }

  selectTo(event:any){
    console.log(event)
  }
}
