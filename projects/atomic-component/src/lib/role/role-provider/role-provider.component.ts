import {
  Component,
  OnInit,
  Input,
  HostBinding,
  AfterContentInit
} from "@angular/core";
import { getStyleSheet, Sheet } from "../../utils/sheet";

@Component({
  selector: "RoleProvider",
  template: `
    <ng-content *ngIf="roles.includes(role)"></ng-content>
  `
})
export class RoleProviderComponent implements OnInit, AfterContentInit {
  @Input() css: object;
  @Input() roles: Array<string>;
  @Input() role: string;
  @HostBinding("class") className;
  public sheet: Sheet;

  constructor() {}

  ngOnInit() {
    const { css } = this;
    this.sheet = getStyleSheet({
      role: {
        ...css
      }
    });
  }

  ngAfterContentInit() {
    this.className = this.sheet.classes.role;
  }
}
