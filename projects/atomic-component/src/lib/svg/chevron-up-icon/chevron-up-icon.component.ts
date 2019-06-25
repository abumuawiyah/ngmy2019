import {
  Component,
  OnInit,
  HostBinding,
  Input,
  AfterContentInit
} from "@angular/core";
import { getStyleSheet, Sheet } from "../../utils/sheet";

@Component({
  selector: "ChevronUpIcon",
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  `
})
export class ChevronUpIconComponent implements OnInit, AfterContentInit {
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
