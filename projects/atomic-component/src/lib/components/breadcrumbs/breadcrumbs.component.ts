import {
  Component,
  ContentChild,
  TemplateRef,
  Directive,
  HostBinding,
  ElementRef,
  Input,
  Inject,
  forwardRef,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  AfterViewInit
} from "@angular/core";
import { fromEvent, Subject, BehaviorSubject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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

@Component({
  selector: "Breadcrumbs",
  exportAs: "Breadcrumbs",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="state | async as breadcrumbState">
      <ng-container
        *ngTemplateOutlet="template; context: breadcrumbState"
      ></ng-container>
    </ng-container>
  `
})
export class BreadcrumbsComponent implements AfterViewInit, OnDestroy {
  @ContentChild(TemplateRef, { static: false }) template!: TemplateRef<any>;

  state = new BehaviorSubject({ selectedItem: {}, highlightedItem: {} });

  itemClick(item) {
    this.state.next({
      selectedItem: item,
      highlightedItem: this.state.getValue().highlightedItem
    });
  }

  itemHover(item) {
    this.state.next({
      highlightedItem: item,
      selectedItem: this.state.getValue().selectedItem
    });
  }

  ngAfterViewInit() {
    this.state.next({
      selectedItem: { value: "" },
      highlightedItem: { value: "" }
    });
  }

  ngOnDestroy() {}
}
