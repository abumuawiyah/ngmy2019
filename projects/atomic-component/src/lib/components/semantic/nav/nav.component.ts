import {
  Component,
  OnInit,
  Input,
  HostBinding,
  AfterContentInit
} from "@angular/core";
import { Sheet, getStyleSheet } from "../../../utils/sheet";

@Component({
  selector: "NAV",
  template: `
    <ng-content></ng-content>
  `
})
export class NavComponent implements OnInit, AfterContentInit {
  @Input() css: object;
  @HostBinding("class") className;
  public sheet: Sheet;

  constructor() {}

  ngOnInit() {
    const { css, ...other } = this;
    this.sheet = getStyleSheet({
      nav: {
        ...css,
        ...other
      }
    });
  }

  ngAfterContentInit() {
    this.className = this.sheet.classes.nav;
  }
}
