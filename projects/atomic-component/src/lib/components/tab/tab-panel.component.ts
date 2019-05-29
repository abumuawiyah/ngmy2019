import { Component, HostBinding, Input, AfterContentInit } from "@angular/core";
import { Sheet, getStyleSheet } from "../../utils/sheet";

@Component({
  selector: "TabPanel",
  template: `
    <ng-content *ngIf="active"></ng-content>
  `
})
export class TabPanelComponent implements AfterContentInit {
  @HostBinding("class") className;
  @Input() active: boolean;
  @Input() css: object;
  public sheet: Sheet;

  ngAfterContentInit() {
    const { css } = this;
    this.sheet = getStyleSheet({
      tabPanel: {
        ...css
      }
    });
    this.className = this.sheet.classes.tabPanel;
  }
}
