import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  AfterContentInit
} from "@angular/core";
import { getStyleSheet, Sheet } from "../../utils/sheet";
import { Item, itemToString } from "./dropdown";
import styles from "./dropdown-bootstrap.style";

@Component({
  selector: "DropdownBootstrap",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <frontal
      #frontal
      [itemToString]="itemToString"
      [isOpen]="false"
      on-select="onSelect($event)"
    >
      <ng-template
        let-value="inputValue"
        let-isOpen="isOpen"
        let-highlightedIndex="highlightedIndex"
        let-selectedItem="selectedItem"
      >
        <Box [flexDirection]="'column'">
          <button frontalButton [class]="classes.input">
            {{ selectedItem ? selectedItem.name : "Select your item" }}
          </button>

          <div frontalList *ngIf="isOpen" [class]="classes.list">
            <a
              frontalItem
              *ngFor="let item of items; let index = index"
              [value]="item"
              [class]="highlightedIndex === index ? classes.highlight : ''"
            >
              {{ item.name }}
            </a>
          </div>
        </Box>
      </ng-template>
    </frontal>
  `
})
export class DropdownBootstrapComponent implements OnInit, AfterContentInit {
  @Input() items: Item[];
  @Input() label: string;
  @Input() variant: string;
  @HostBinding() className;
  public sheet: Sheet;
  public classes: object;
  public isOpen: boolean;
  public itemToString = itemToString;

  ngOnInit() {
    this.sheet = getStyleSheet({ ...styles({ variant: this.variant }) });
  }

  ngAfterContentInit() {
    this.classes = this.sheet.classes;
  }

  onSelect(item: Item) {
    alert(`${item.name} selected!`);
  }
}
