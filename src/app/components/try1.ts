<div class="tasks-wrapper">
  <div class="card card-custom">
    <div class="chart-header">
      <div>
        <h3 class="heading-wrapper">Task Planner</h3>
      </div>

      <div class="toggle">
        <div (click)="toggleTask=false" class="toogle-item" [ngClass]="{'toggle-selected':!toggleTask}">List View</div>
        <div (click)="toggleTask=true" class="toogle-item" [ngClass]="{'toggle-selected':toggleTask}">Calender View</div>
      </div>
      

      <div *ngIf="isExpanded" [mat-dialog-close]="true">
        <img
          src="assets/images/Collpase_RDA.svg"
          alt="Collapse"
          height="17"
          width="17"
          class="pointer-cursor"
        />
      </div>
      <div *ngIf="!isExpanded" class="gap-wrapper">
        <img
          src="assets/images/Refresh_RDA.svg"
          alt="Refresh"
          height="17"
          width="17"
          class="pointer-cursor"
          (click)="getPlanAreaTasks()"
        />
        <img
          src="assets/images/Expand_RDA.svg"
          alt="Expand"
          height="17"
          width="17"
          class="pointer-cursor"
          (click)="expand()"
        />
      </div>
    </div>
    <div class="date-task-wrapper">
    <div *ngIf="!toggleTask" style="display: flex; align-items: center; width: 100%; gap: 10px;">
      <div
      class="date-picker-wrapper calendar-wrapper"
    >
      <div class="grid-container">
        <span
          *ngFor="let month of monthList"
          class="month-item pointer-cursor"
          (click)="onMonthSelect(month)"
          [ngClass]="{ 'month-selected': month.value === selectedMonth }"
        >
          {{ month.name | translate }}
        </span>
      </div>
      <div class="datepicker-theme dp-popup">
        <dp-day-calendar
          *ngFor="let setting of datePickArr; let i = index"
          class="datepicker-theme"
          [config]="setting"
          [(ngModel)]="selectedDays"
          (onSelect)="onDaySelect($event)"
        >
        </dp-day-calendar>
      </div>
    </div>
    <span class="divider-wrapper"></span>
    <div class="plan-wrapper" *ngIf="data?.length">
      <div *ngFor="let planArea of data">
        <div 
          class="plan-area-wrapper pointer-cursor"
          (click)="planAreaObj[planArea.id] = !planAreaObj[planArea.id]"
          >
          <span class="plan-heading-wrapper pointer-cursor">{{ planArea.name }}</span>
          <span
            class="fa expand-icon"
            [ngClass]="
              planAreaObj[planArea.id] ? 'fa fa-angle-up' : 'fa fa-angle-down'
            "
          >
          </span>
        </div>
        <div
          *ngIf="planAreaObj[planArea.id] && planArea?.tasks?.length > 0"
          class="task-wrapper"
        >
          <table
            class="table table-hover table-bordered table-striped table-condensed"
          >
            <thead>
              <tr>
                <th class="task-heading-wrapper name-heading text-left">
                  Task Name
                </th>
                <th class="task-heading-wrapper location-heading text-left">
                  Location
                </th>
                <th class="task-heading-wrapper product-heading text-left">
                  Product
                </th>
                <th class="task-heading-wrapper est-hr-heading text-center">
                  Est. Hr.
                </th>
                <th class="task-heading-wrapper est-cost-heading text-center">
                  Est. Cost
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let task of planArea.tasks">
                <td class="text-left">
                  <div class="cell-wrapper">
                    <span class="task-type-wrapper">
                      {{
                        task.routine_id
                          ? 'P'
                          : task.application_planner_task_id
                          ? 'A'
                          : 'Q'
                      }}
                    </span>
                    <span class="name-wrapper">
                      {{ task.name }}
                    </span>
                    <span
                      *ngIf="
                        task.status === 'Completed' ||
                        task.status === 'Ignored' ||
                        task.current_status === 'inprogress'
                      "
                      class="status-wrapper"
                      [ngClass]="
                        task.status === 'Completed'
                          ? 'completed-wrapper'
                          : task.status === 'Ignored'
                          ? 'ignored-wrapper'
                          : task.current_status === 'inprogress'
                          ? 'in-progress-wrapper'
                          : ''
                      "
                    >
                      {{
                        task.status === 'Completed'
                          ? 'Completed'
                          : task.status === 'Ignored'
                          ? 'Ignored'
                          : task.current_status === 'inprogress'
                          ? 'Started'
                          : ''
                      }}
                    </span>
                  </div>
                </td>
                <td class="task-location-wrapper text-left">
                  <div
                    class="name-wrapper name-width-wrapper"
                    *ngIf="task.task_locations?.length"
                  >
                    <div class="loc-name-wrapper">
                      {{ task.task_locations[0].name }}
                    </div>
                  </div>

                  <span
                    id="dropdownMenuLink"
                    class="location-count-wrapper auto-count-content-box dropdown-toggle count-wrapper"
                    data-toggle="dropdown"
                    *ngIf="task.task_locations?.length > 1"
                  >
                    +{{ task.task_locations?.length - 1 }}
                  </span>
                  <div
                    aria-labelledby="dropdownMenuLink"
                    class="dropdown-menu custom-dropdown-menu"
                  >
                    <div
                      class="dropdown-list-menu"
                      (click)="$event.stopPropagation()"
                    >
                      <div class="dropdown-overflow float-left">
                        <a
                          class="dropdown-item"
                          *ngFor="
                            let loc of task.task_locations;
                            let i = index
                          "
                        >
                          <div class="float-left" style="width: 100%">
                            <span class="task-name product-name">
                              {{ loc?.name }}</span
                            >
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="task-product-wrapper text-left">
                  <div
                    class="name-wrapper name-width-wrapper"
                    *ngIf="task.task_products?.length"
                  >
                    <div class="product-name-wrapper">
                      {{ task.task_products[0].name }}
                    </div>
                  </div>
                  <span
                    id="dropdownMenuLink"
                    class="location-count-wrapper auto-count-content-box dropdown-toggle count-wrapper"
                    data-toggle="dropdown"
                    *ngIf="task.task_products?.length > 1"
                  >
                    +{{ task.task_products?.length - 1 }}
                  </span>

                  <div
                    aria-labelledby="dropdownMenuLink"
                    class="dropdown-menu custom-dropdown-menu"
                  >
                    <div
                      class="dropdown-list-menu"
                      (click)="$event.stopPropagation()"
                    >
                      <div class="dropdown-overflow float-left">
                        <a
                          class="dropdown-item"
                          *ngFor="
                            let loc of task.task_products;
                            let i = index
                          "
                        >
                          <div class="float-left" style="width: 100%">
                            <span class="task-name product-name">
                              {{ loc?.name }}</span
                            >
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="task-est-hr-wrapper text-center name-wrapper">
                  {{ task.estimated_time }}
                </td>
                <td class="task-est-cost-wrapper text-center name-wrapper">
                  {{ task.avg_labor_cost }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  <div *ngIf="!data?.length" class="no-data-wrapper">No Data</div>
  </div>
  <div *ngIf="toggleTask">
    hih
  </div>
    </div>
  </div>
</div>
