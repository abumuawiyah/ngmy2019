import {
  Component,
  OnInit,
  HostBinding,
  Input,
  AfterContentInit
} from "@angular/core";
import { getStyleSheet, Sheet } from "../../utils/sheet";

@Component({
  selector: "ChevronDownIcon",
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      <path fill="none" d="M0 0h24v24H0V0z" />
    </svg>
  `
})
export class ChevronDownIconComponent implements OnInit, AfterContentInit {
  @HostBinding("class") className;
  @Input() css: object;
  public sheet: Sheet;

  constructor() {}

  ngOnInit() {
    const { css } = this;
    this.sheet = getStyleSheet({
      icon: {
        ...css
      }
    });
  }

  ngAfterContentInit() {
    this.className = this.sheet.classes.icon;
  }
}
