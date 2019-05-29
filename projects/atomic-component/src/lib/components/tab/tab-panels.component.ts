import {
  Component,
  ContentChildren,
  QueryList,
  OnInit,
  HostBinding,
  Input,
  AfterContentInit
} from "@angular/core";
import { Sheet, getStyleSheet } from "../../utils/sheet";
import { TabPanelComponent } from "./tab-panel.component";

@Component({
  selector: "TabPanels",
  template: `
    <ng-content></ng-content>
  `
})
export class TabPanelsComponent implements AfterContentInit {
  @HostBinding("class") className;
  @Input() css: object;
  public sheet: Sheet;
  @ContentChildren(TabPanelComponent) children!: QueryList<TabPanelComponent>;

  ngAfterContentInit() {
    const { css } = this;
    this.sheet = getStyleSheet({
      tabPanels: {
        ...css
      }
    });
    this.className = this.sheet.classes.tabPanels;
  }
}
