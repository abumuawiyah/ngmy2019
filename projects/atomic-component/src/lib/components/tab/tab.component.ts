import {
  Component,
  HostListener,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  HostBinding,
  AfterContentInit,
  AfterContentChecked
} from "@angular/core";
import { Sheet, getStyleSheet } from "../../utils/sheet";

@Component({
  selector: "Tab",
  template: `
    <ng-content></ng-content>
  `
})
export class TabComponent implements AfterContentChecked {
  @Input() index: number;
  @Input() active: boolean;
  @Input() css: object;
  @Output() tabClick: EventEmitter<object> = new EventEmitter();
  @HostBinding("class") className;
  public sheet: Sheet;
  @HostListener("click", ["$event"])
  onClick() {
    this.tabClick.emit({ index: this.index });
  }

  ngAfterContentChecked() {
    const { css, active } = this;
    this.sheet = getStyleSheet({
      tab: {
        borderBottom: `4px solid ${active ? "red" : "blue"}`,
        flex: "0 0 auto",
        display: "flex",
        paddingLeft: "4px",
        alignItems: "center",
        margin: 4,
        height: 40,
        cursor: "pointer",
        ...css
      }
    });
    this.className = this.sheet.classes.tab;
  }
}
