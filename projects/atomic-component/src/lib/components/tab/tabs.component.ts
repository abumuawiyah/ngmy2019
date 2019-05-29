import {
  Component,
  ContentChild,
  AfterContentInit,
  Input,
  HostBinding,
  OnInit
} from "@angular/core";
import { TabListComponent } from "./tab-list.component";
import { TabPanelsComponent } from "./tab-panels.component";
import { getStyleSheet, Sheet } from "../../utils/sheet";

@Component({
  selector: "Tabs",
  template: `
    <ng-content></ng-content>
  `
})
export class TabsComponent implements OnInit, AfterContentInit {
  @HostBinding("class") className;
  @Input() css: object;
  @Input() activeIndex: number;
  @ContentChild(TabListComponent) tabList: TabListComponent;
  @ContentChild(TabPanelsComponent) tabPanels: TabPanelsComponent;
  public sheet: Sheet;

  ngOnInit() {
    const { css, ...other } = this;
    this.sheet = getStyleSheet({
      tabs: {
        display: "flex",
        flexDirection: "column",
        ...css
      }
    });
  }

  ngAfterContentInit() {
    this.className = this.sheet.classes.tabs;
    this.tabList.children.forEach((tab, idx) => {
      tab.index = idx;
      tab.tabClick.subscribe(({ index }) => {
        this.activeIndex = index;
        this.update();
      });
    });
    this.activeIndex = this.activeIndex ? this.activeIndex : 0;
    this.update();
  }

  update() {
    this.tabPanels.children.forEach((tabPanel, idx) => {
      tabPanel.active = idx === this.activeIndex ? true : false;
    });

    this.tabList.children.forEach((tab, idx) => {
      tab.active = idx === this.activeIndex ? true : false;
    });
  }
}
