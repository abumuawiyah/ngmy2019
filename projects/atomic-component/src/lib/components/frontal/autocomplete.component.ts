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
  selector: "Autocomplete",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <frontal [itemToString]="itemToString">
      <ng-template
        let-value="inputValue"
        let-isOpen="isOpen"
        let-highlightedIndex="highlightedIndex"
        let-selectedItem="selectedItem"
      >
        <div [class]="classes.container">
          <input
            [class]="classes.input"
            placeholder="Select your item"
            type="text"
            frontalInput
          />

          <ng-container *ngIf="isOpen">
            <ul
              [class]="classes.list"
              *ngIf="filter(value).length > 0"
              frontalList
            >
              <li
                [class]="highlightedIndex === index ? classes.highlight : ''"
                *ngFor="
                  let item of filter(value);
                  trackBy: trackItemById;
                  let index = index
                "
                [value]="item"
                frontalItem
              >
                {{ item.name }}
              </li>
            </ul>

            <div *ngIf="filter(value).length === 0">
              No item found...
            </div>
          </ng-container>
        </div>
      </ng-template>
    </frontal>
  `
})
export class AutocompleteComponent implements OnInit, AfterContentInit {
  @Input() items: Item[];
  @Input() inputProps: object;
  @Input() listProps: object;
  @Input() label: string;
  @Input() variant: string;
  @HostBinding() className;
  public sheet: Sheet;
  public classes: object;
  public itemToString = itemToString;

  filter(query: string) {
    return this.items.filter(({ name }) =>
      name.toLowerCase().startsWith(query.toLowerCase())
    );
  }

  filteredHeroes(query: string) {
    return this.filter(query);
  }

  trackItemById(index: number, item: Item) {
    return item.id;
  }

  ngOnInit() {
    const { inputProps, listProps } = this;
    this.sheet = getStyleSheet({
      container: {
        width: "100%",
        height: 44
      },
      input: {
        display: "flex",
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        border: "1px solid",
        flex: 1,
        textIndent: 16,
        outline: 0,
        fontSize: 14,
        ...inputProps
      },
      list: {
        textIndent: 16,
        border: "1px solid",
        lineHeight: 2,
        ...listProps
      },
      highlight: {
        background: "tomato"
      }
    });
  }

  ngAfterContentInit() {
    this.classes = this.sheet.classes;
  }
}
