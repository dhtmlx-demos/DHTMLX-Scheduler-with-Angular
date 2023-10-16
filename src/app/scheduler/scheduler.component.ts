import { Scheduler, SchedulerStatic } from "@dhx/trial-scheduler";
import { getData } from "./data";

import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  styleUrls: ["./scheduler.component.css"],
  template: `<div #here class="widget"></div>`,
})
export class SchedulerComponent implements OnInit, OnDestroy {
  @ViewChild("here", { static: true }) schedulerContainer!: ElementRef;
  private _scheduler?: SchedulerStatic;

  ngOnInit() {
    const events = getData();

    let scheduler = Scheduler.getSchedulerInstance();
    scheduler.init(
      this.schedulerContainer.nativeElement,
      new Date(2023, 9, 6),
      "week", 
    );
    scheduler.parse(events);

    this._scheduler = scheduler;
  }

  ngOnDestroy() {
    if (this._scheduler) this._scheduler.destructor();
  }
}
