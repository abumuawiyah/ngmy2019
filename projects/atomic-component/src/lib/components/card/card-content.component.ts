import {
  Component,
  AfterContentInit,
  Input,
  HostBinding,
  OnInit
} from "@angular/core";
import { getStyleSheet, Sheet } from "../../utils/sheet";

@Component({
  selector: "CardContent",
  template: `
    <ng-content></ng-content>
  `
})
export class CardContentComponent implements OnInit, AfterContentInit {
  @HostBinding("class") className;
  @Input() css: object;
  public sheet: Sheet;

  ngOnInit() {
    const { css, ...other } = this;
    this.sheet = getStyleSheet({
      cardContent: {
        ...css
      }
    });
  }

  ngAfterContentInit() {
    this.className = this.sheet.classes.cardContent;
  }
}
