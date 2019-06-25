import { isPlatformBrowser } from "@angular/common";
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
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ViewRef,
  AfterViewInit,
  PLATFORM_ID,
  QueryList,
  ContentChildren,
  HostListener
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  fromEvent,
  Subject,
  BehaviorSubject,
  animationFrameScheduler
} from "rxjs";
import {
  takeUntil,
  tap,
  scan,
  withLatestFrom,
  filter,
  auditTime,
  distinctUntilChanged,
  map
} from "rxjs/operators";

@Directive({
  selector: "[breadcrumbItem]",
  exportAs: "breadcrumbItem"
})
export class BreadcrumbItemDirective
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() item: Object = {};
  @HostBinding("class") className = "toggle-btn toggle-btn-on";
  private destroy = new Subject<void>();

  constructor(
    private element: ElementRef,
    @Inject(forwardRef(() => BreadcrumbsComponent))
    private breadcrumbs: BreadcrumbsComponent
  ) {}

  ngOnInit() {
    console.log("className", this.className, this.breadcrumbs);
  }

  ngAfterViewInit() {
    fromEvent(this.element.nativeElement, "click")
      .pipe(takeUntil(this.destroy))
      .subscribe(_ => this.breadcrumbs.itemClick(this.item));
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}

@Directive({
  selector: "[breadcrumbList]",
  exportAs: "breadcrumbList"
})
//  AfterViewInit,
export class BreadcrumbListDirective implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  constructor(
    private element: ElementRef,
    @Inject(forwardRef(() => BreadcrumbsComponent))
    private switcher: BreadcrumbsComponent
  ) {}

  ngOnInit() {}

  // ngAfterViewInit() {
  //   fromEvent(this.element.nativeElement, "click")
  //     .pipe(takeUntil(this.destroy))
  //     .subscribe(_ => this.switcher.itemClick("hs"));
  // }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}

export const BREADCRUMBS_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BreadcrumbsComponent),
  multi: true
};

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
  `,
  providers: [BREADCRUMBS_VALUE_ACCESSOR]
})
export class BreadcrumbsComponent implements AfterViewInit, OnDestroy {
  @ContentChild(TemplateRef) template!: TemplateRef<any>;
  @ContentChild(BreadcrumbListDirective)
  breadcrumbList!: BreadcrumbListDirective;
  @ContentChild(BreadcrumbItemDirective)
  breadcrumbItemDirective!: BreadcrumbItemDirective;

  state = new BehaviorSubject({ selectedItem: {} });

  private _onChange = (value: any) => {};

  itemClick(item) {
    console.log("yeaahaa", item, this.state);
    this.state.next({ selectedItem: item });
  }

  ngAfterViewInit() {
    this.state.next({ selectedItem: { value: "" } });
  }

  ngOnDestroy() {}
}
