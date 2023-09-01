import { Gantt, GanttStatic } from "@dhx/trial-gantt";
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
  selector: "gantt",
  styleUrls: ["./gantt.component.css"],
  template: `<div #here class="widget"></div>`,
})
export class GanttComponent implements OnInit, OnDestroy {
  @ViewChild("here", { static: true }) ganttContainer!: ElementRef;
  private _gantt?: GanttStatic;

  ngOnInit() {
    const tasks = getData();

    let gantt = Gantt.getGanttInstance();
    gantt.init(this.ganttContainer.nativeElement);
    gantt.parse(tasks);

    this._gantt = gantt;
  }

  ngOnDestroy() {
    if (this._gantt) this._gantt.destructor();
  }
}
