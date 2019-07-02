import {
  Directive,
  HostBinding,
  ElementRef,
  Input,
  Inject,
  forwardRef,
  OnInit,
  OnDestroy,
  AfterViewInit
} from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BreadcrumbsComponent } from "./breadcrumbs.component";

@Directive({
  selector: "[breadcrumbItem]",
  exportAs: "breadcrumbItem"
})
export class BreadcrumbItemDirective
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() item: Object = {};
  @HostBinding("class") className = "";
  private destroy = new Subject<void>();

  constructor(
    private element: ElementRef,
    @Inject(forwardRef(() => BreadcrumbsComponent))
    private breadcrumbs: BreadcrumbsComponent
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    fromEvent(this.element.nativeElement, "click")
      .pipe(takeUntil(this.destroy))
      .subscribe(_ => this.breadcrumbs.itemClick(this.item));

    fromEvent(this.element.nativeElement, "mouseover")
      .pipe(takeUntil(this.destroy))
      .subscribe(_ => this.breadcrumbs.itemHover(this.item));
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
