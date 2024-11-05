import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HighchartsComponent } from './components/charts/highcharts/highcharts.component';
import { D3chartsComponent } from './components/charts/d3charts/d3charts.component';
import { D3chartsAgComponent } from './components/charts/d3charts-ag/d3charts-ag.component';
import { TextEditorComponent } from './components/text-editorr/text-editor/text-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuillComponent } from './components/text-editorr/quill/quill.component';
import { KolkovEditorComponent } from "./components/text-editorr/kolkov-editor/kolkov-editor.component";
import { TexteditorQuillComponent } from './components/text-editorr/texteditor-quill/texteditor-quill.component';
import { MultiSelectComponent } from './components/multi-select-dropdown/multi-select/multi-select.component';
import { SelectComponent } from './components/multi-select-dropdown/select/select.component';
import { DatePickerComponent } from "./components/Dates/date-picker/date-picker.component";
import { MatreialDatesComponent } from './components/Dates/matreial-dates/matreial-dates.component';
import {  TranslateModule } from '@ngx-translate/core';
import { PopupDatePickerComponent } from "./components/Dates/popup-date-picker/popup-date-picker.component";
import { DateTimeService } from './services/date-time/date-time.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToasterComponent } from "./components/toaster/toaster.component";
import { toast, NgxSonnerToaster } from 'ngx-sonner';
import { NgxSoonerComponent } from "./components/ngx-sooner/ngx-sooner.component";
import { TooltipchartComponent } from "./components/charts/tooltipchart/tooltipchart.component";
import { TableComponent } from "./components/table/table.component";
import { PieChartComponent } from "./components/charts/pie-chart/pie-chart.component";
import { FullCalendarComponent } from "./components/calendar/full-calendar/full-calendar.component";
import { InfiniteScrollComponent } from "./components/infinte-scrll/infinite-scroll/infinite-scroll.component";
import { InfiniteImageComponent } from "./components/infinte-scrll/infinite-image/infinite-image.component";
import { InfinteTableComponent } from "./components/infinte-scrll/infinte-table/infinte-table.component";
import { ImageList2Component } from "./components/infinte-scrll/image-list2/image-list2.component";
import { DonutChartComponent } from "./components/charts/donut-chart/donut-chart.component";
import { FullCalendar2Component } from "./components/calendar/full-calendar2/full-calendar2.component";
import { D3TooltipComponent } from "./components/charts/d3-tooltip/d3-tooltip.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CKEditorModule,
    FormsModule,
    MultiSelectComponent,
    SelectComponent,
    HighchartsComponent,
    D3chartsComponent,
    D3chartsAgComponent,
    TextEditorComponent,
    TexteditorQuillComponent,
    ReactiveFormsModule,
    QuillComponent,
    KolkovEditorComponent,
    DatePickerComponent,
    MatreialDatesComponent,
    TranslateModule,
    PopupDatePickerComponent,
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule,
    ToasterComponent,
    NgxSonnerToaster,
    NgxSoonerComponent,
    TooltipchartComponent,
    TableComponent,
    PieChartComponent,
    FullCalendarComponent,
    InfiniteScrollComponent,
    InfiniteImageComponent,
    InfinteTableComponent,
    DonutChartComponent,
    FullCalendar2Component,
    D3TooltipComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'trykit';
  protected readonly toast = toast;

  groupData = [
    {
      key: new Date(2019, 1, 7),
      values: [
        { grpName: 'GBP', grpValue: 1600 },
        { grpName: 'EUR', grpValue: 1520 },
        { grpName: 'USD', grpValue: 480 },
      ],
    },
    {
      key: new Date(2019, 1, 14),
      values: [
        { grpName: 'GBP', grpValue: 1460 },
        { grpName: 'EUR', grpValue: 2300 },
        { grpName: 'USD', grpValue: 580 },
      ],
    },
    {
      key: new Date(2019, 1, 21),
      values: [
        { grpName: 'GBP', grpValue: 320 },
        { grpName: 'EUR', grpValue: 900 },
        { grpName: 'USD', grpValue: 1500 },
      ],
    },
    {
      key: new Date(2019, 1, 28),
      values: [
        { grpName: 'GBP', grpValue: 410 },
        { grpName: 'EUR', grpValue: 1550 },
        { grpName: 'USD', grpValue: 600 },
      ],
    },
  ];

}
