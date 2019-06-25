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

// @Directive({
//   selector: "[switcherButton]",
//   exportAs: "switcherButton"
// })
// export class SwitcherButtonDirective
//   implements OnInit, AfterViewInit, OnDestroy {
//   @HostBinding("attr.type") type = "button";
//   @HostBinding("attr.role") role = "button";
//   @HostBinding("attr.data-toggle") dataToggle = true;
//   @HostBinding("attr.aria-haspopup") ariaHasPopup = "listbox";
//   @HostBinding("attr.aria-expanded") ariaExpanded = false;
//   @HostBinding("attr.aria-label") ariaLabel = "";
//   @HostBinding("attr.id") attrId = 1;
//   @HostBinding("attr.aria-labelledby") ariaLabeledBy = 1;
//   @Output() switchEventClick: EventEmitter<object> = new EventEmitter();
//   // @HostListener("click", ["$event"])
//   // onClick() {
//   //   alert(123);
//   //   this.switchEventClick.emit({ msg: "welcome!" });
//   // }
//   private destroy = new Subject<void>();

//   constructor(
//     private element: ElementRef,
//     @Inject(forwardRef(() => SwitcherComponent))
//     private frontal: SwitcherComponent
//   ) {}

//   ngOnInit() {}

//   ngAfterViewInit() {}

//   buttonClick() {
//     alert(123);
//     this.switchEventClick.emit({ msg: "welcome!" });
//   }

//   ngOnDestroy() {
//     this.destroy.next();
//     this.destroy.complete();
//   }
// }

@Directive({
  selector: "[switcherToggleOn]",
  exportAs: "switcherToggleOn"
})
export class SwitcherToggleOnDirective
  implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding("class") className = "toggle-btn toggle-btn-on";
  // @HostBinding("style.display") display = "none";
  private destroy = new Subject<void>();

  constructor(
    private element: ElementRef,
    @Inject(forwardRef(() => SwitcherComponent))
    private switcher: SwitcherComponent
  ) {}

  ngOnInit() {
    console.log("className", this.className);
    console.log(this.switcher.buttonClick);
  }

  ngAfterViewInit() {
    fromEvent(this.element.nativeElement, "click")
      .pipe(takeUntil(this.destroy))
      .subscribe(_ => this.switcher.buttonClick("on"));
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}

@Directive({
  selector: "[switcherToggleOff]",
  exportAs: "switcherToggleOff"
})
export class SwitcherToggleOffDirective
  implements OnInit, AfterViewInit, OnDestroy {
  private destroy = new Subject<void>();

  constructor(
    private element: ElementRef,
    @Inject(forwardRef(() => SwitcherComponent))
    private switcher: SwitcherComponent
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    fromEvent(this.element.nativeElement, "click")
      .pipe(takeUntil(this.destroy))
      .subscribe(_ => this.switcher.buttonClick("off"));
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}

export const SWITCHER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitcherComponent),
  multi: true
};

@Component({
  selector: "Switcher",
  exportAs: "Switcher",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="state | async as switcherState">
      <ng-container
        *ngTemplateOutlet="template; context: switcherState"
      ></ng-container>
    </ng-container>
  `,
  providers: [SWITCHER_VALUE_ACCESSOR]
})
export class SwitcherComponent implements AfterViewInit, OnDestroy {
  @ContentChild(TemplateRef) template!: TemplateRef<any>;
  @ContentChild(SwitcherToggleOnDirective)
  on!: SwitcherToggleOnDirective;
  @ContentChild(SwitcherToggleOffDirective)
  off!: SwitcherToggleOffDirective;

  state = new BehaviorSubject({ status: "off" });

  private _onChange = (value: any) => {};

  buttonClick(state) {
    this.state.next({ status: state });
  }

  ngAfterViewInit() {
    // this.state.next({ status: "on" });
  }

  ngOnDestroy() {}
}
