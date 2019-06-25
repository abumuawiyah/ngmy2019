import {
  Component,
  OnInit,
  Input,
  HostBinding,
  AfterContentInit
} from "@angular/core";
import { Sheet, getStyleSheet } from "../../../utils/sheet";

@Component({
  selector: "LI",
  template: `
    <ng-content></ng-content>
  `
})
export class LiComponent implements OnInit, AfterContentInit {
  @Input() css: object;
  @HostBinding("class") className;
  public sheet: Sheet;

  constructor() {}

  ngOnInit() {
    const { css, ...other } = this;
    this.sheet = getStyleSheet({
      li: {
        ...css,
        ...other
      }
    });
  }

  ngAfterContentInit() {
    this.className = this.sheet.classes.li;
  }
}
