import {
  Component,
  ContentChildren,
  QueryList,
  OnInit,
  HostBinding,
  Input,
  AfterContentInit
} from "@angular/core";
import { TabComponent } from "./tab.component";
import { Sheet, getStyleSheet } from "../../utils/sheet";

@Component({
  selector: "TabList",
  template: `
    <ng-content></ng-content>
  `
})
export class TabListComponent implements AfterContentInit {
  @HostBinding("class") className;
  @Input() css: object;
  @ContentChildren(TabComponent) children!: QueryList<TabComponent>;
  public sheet: Sheet;

  ngAfterContentInit() {
    const { css } = this;
    this.sheet = getStyleSheet({
      tabList: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: `calc(100% / ${this.children.length})`,
        ...css
      }
    });
    this.children.forEach(child => {
      child.css = {
        ...child.css,
        width: `calc(100% / ${this.children.length})`
      };
    });
    this.className = this.sheet.classes.tabList;
  }
}
