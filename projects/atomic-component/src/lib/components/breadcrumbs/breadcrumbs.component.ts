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
import { NG_VALUE_ACCESSOR } from "@angular/forms";
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
  }

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
  @ContentChild(TemplateRef, { static: false }) template!: TemplateRef<any>;

  state = new BehaviorSubject({ selectedItem: {} });

  itemClick(item) {
    this.state.next({ selectedItem: item });
  }

  ngAfterViewInit() {
    this.state.next({ selectedItem: { value: "" } });
  }

  ngOnDestroy() {}
}
