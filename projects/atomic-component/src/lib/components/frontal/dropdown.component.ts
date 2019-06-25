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

@Component({
  selector: "Dropdown",
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
          <Box
            [css]="{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid'
            }"
          >
            <button [class]="classes.button" frontalButton>
              {{ selectedItem ? selectedItem.name : "Select your item" }}
            </button>
            <ChevronDownIcon *ngIf="!isOpen"></ChevronDownIcon>
            <ChevronUpIcon *ngIf="isOpen"></ChevronUpIcon>
          </Box>

          <ul [class]="classes.list" *ngIf="isOpen" frontalList>
            <li
              [class]="highlightedIndex === index ? classes.highlight : ''"
              *ngFor="let item of items; let index = index"
              [value]="item"
              frontalItem
            >
              {{ item.name }}
            </li>
          </ul>
        </Box>
      </ng-template>
    </frontal>
  `
})
export class DropdownComponent implements OnInit, AfterContentInit {
  @Input() items: Item[];
  @Input() inputProps: object;
  @Input() listProps: object;
  @Input() label: string;
  @Input() variant: string;
  @HostBinding() className;
  public sheet: Sheet;
  public classes: object;
  public itemToString = itemToString;

  ngOnInit() {
    const { inputProps, listProps } = this;
    this.sheet = getStyleSheet({
      button: {
        height: 44,
        display: "flex",
        flex: 1,
        textIndent: 16,
        outline: 0,
        ...inputProps
      },
      chevron: {
        transform: "rotate(180deg)",
        flex: "0 0 16px"
      },
      list: {
        textIndent: 16,
        border: "1px solid",
        lineHeight: 2,
        ...listProps
      },
      highlight: {
        background: "red"
      }
    });
  }

  ngAfterContentInit() {
    this.classes = this.sheet.classes;
  }

  onSelect(item: Item) {
    alert(`${item.name} selected!`);
  }
}
