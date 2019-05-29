import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy
} from "@angular/core";
import { getStyleSheet, Sheet } from "../../utils/sheet";

export interface Hero {
  id: number;
  name: string;
  disabled: boolean;
}

export const heroes: Hero[] = [
  { id: 11, name: "Mr. Nice", disabled: false },
  { id: 12, name: "Narco", disabled: false },
  { id: 13, name: "Bombasto", disabled: true },
  { id: 14, name: "Celeritas", disabled: false },
  { id: 15, name: "Magneta", disabled: false },
  { id: 16, name: "RubberMan", disabled: false },
  { id: 17, name: "Dynama", disabled: true },
  { id: 18, name: "Dr IQ", disabled: false },
  { id: 19, name: "Magma", disabled: false },
  { id: 20, name: "Tornado", disabled: false }
];

export const toString = (hero: Hero) => hero.name;

const styles: any = {
  dropdown: {
    width: "100%",
    position: "relative"
  },
  button: {
    backgroundColor: "white",
    height: 39,
    width: "100%",
    display: "flex",
    paddingLeft: 10,
    boxSizing: "border-box",
    fontSize: 14,
    border: "1px solid #000"
  },
  list: {
    backgroundColor: "white",
    border: "1px solid #000",
    position: "absolute",
    top: 39,
    left: 0,
    width: "100%",
    textIndent: 10,
    boxSizing: "border-box"
  },
  primary: {
    backgroundColor: "blue"
  },
  secondary: {
    backgroundColor: "yellow",
    color: "#000"
  },
  disabled: {
    pointerEvents: "none",
    backgroundColor: "gray",
    color: "#000"
  },
  highlight: {
    backgroundColor: "blue"
  }
};

@Component({
  selector: "Dropdown",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <frontal
      #frontal
      [itemToString]="heroToString"
      [isOpen]="false"
      on-select="onSelect($event)"
    >
      <ng-template
        let-value="inputValue"
        let-isOpen="isOpen"
        let-highlightedIndex="highlightedIndex"
        let-selectedItem="selectedItem"
      >
        <button frontalButton [class]="classes.button">
          {{ selectedItem ? selectedItem.name : "Select your hero" }}
        </button>

        <ul frontalList *ngIf="isOpen" [class]="classes.list">
          <li
            frontalItem
            *ngFor="let hero of heroes; let index = index"
            [value]="hero"
            [class]="highlightedIndex === index ? 'classes.highlight' : ''"
          >
            {{ hero.name }}
          </li>
        </ul>

        <h4>Selected hero:</h4>
        <pre data-test="selected-item">{{ selectedItem | json }}</pre>
      </ng-template>
    </frontal>
  `
})
export class DropdownComponent implements OnInit {
  @Input() css: object;
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() type: string;
  @HostBinding() className;
  public classes: any;
  heroes = heroes;

  ngOnInit() {
    const sheet: any = getStyleSheet(styles);
    this.classes = sheet.classes;
    this.className = sheet.classes.dropdown;
    const variants = {
      primary: `${sheet.classes.primary}`,
      secondary: `${sheet.classes.secondary}`,
      disabled: `${sheet.classes.disabled}`
    };

    if (this.type) {
      this.classes = variants[this.type];
    }

    if (this.disabled === true) {
      this.classes = variants.disabled;
    }
  }

  trackHeroById(index: number, hero: Hero) {
    return hero.id;
  }

  heroToString(hero: Hero) {
    return toString(hero);
  }

  onSelect(hero: Hero) {
    alert(`${hero.name} selected!`);
  }
}
