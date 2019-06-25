import {
  Component,
  OnInit,
  Input,
  HostBinding,
  AfterContentInit
} from "@angular/core";
import { Sheet, getStyleSheet } from "../../../utils/sheet";

@Component({
  selector: "A",
  template: `
    <ng-content></ng-content>
  `
})
export class AComponent implements OnInit, AfterContentInit {
  @Input() css: object;
  @HostBinding("class") className;
  public sheet: Sheet;

  constructor() {}

  ngOnInit() {
    const { css, ...other } = this;
    this.sheet = getStyleSheet({
      a: {
        ...css,
        ...other
      }
    });
  }

  ngAfterContentInit() {
    this.className = this.sheet.classes.a;
  }
}
