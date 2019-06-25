import {
  Component,
  ContentChild,
  AfterContentInit,
  Input,
  HostBinding,
  OnInit
} from "@angular/core";
import { CardContentComponent } from "./card-content.component";
import { getStyleSheet, Sheet } from "../../utils/sheet";

@Component({
  selector: "Card",
  template: `
    <ng-content></ng-content>
  `
})
export class CardComponent implements OnInit, AfterContentInit {
  @HostBinding("class") className;
  @Input() css: object;
  @Input() variant: string;
  @Input() role: Array<string>;
  @ContentChild(CardContentComponent) cardContent: CardContentComponent;
  public sheet: Sheet;

  ngOnInit() {
    const { css, ...other } = this;
    const variants = {
      primary: {
        background: "tomato"
      },
      secondary: {
        background: "yellow"
      }
    };
    this.sheet = getStyleSheet({
      card: {
        width: "100%",
        background: data => data.card.background,
        ...css
      }
    });

    console.log(this.sheet);
    this.sheet.update({
      card: { ...variants[this.variant] }
    });
  }

  ngAfterContentInit() {
    console.log("wer", this.sheet.classes.card);
    console.log(this);
    this.className = this.sheet.classes.card;
  }
}
