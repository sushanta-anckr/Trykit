import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule, NgLabelTemplateDirective, NgOptionTemplateDirective } from '@ng-select/ng-select';
import { map } from 'rxjs';
import { DataService, Person } from '../../../services/data.service';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule,NgSelectModule,FormsModule,NgLabelTemplateDirective, NgOptionTemplateDirective],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css'
})
export class MultiSelectComponent {
	people: Person[] = [];
	selectedPeople:string[] = [];
  
	constructor(private dataService: DataService) {}
  
	ngOnInit() {
	  this.dataService
		.getPeople()
		.pipe(map(x => x.filter(y => !y.disabled)))
		.subscribe(res => {
		  this.people = res;
		  this.selectAllForDropdownItems(this.people);
		});
	}

	onMaterialGroupChange(){
		console.log(this.people)
		console.log(this.selectedPeople)
	}
  
	selectAllForDropdownItems(items: any[]) {
	  let allSelect = (items:any) => {
		items.forEach((element:any) => {
		  element['selectedAllGroup'] = 'selectedAllGroup';
		});
	  };
  
	  allSelect(items);
	}
}
