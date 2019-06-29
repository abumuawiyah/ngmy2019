import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import jss from "jss";
import preset from "jss-preset-default";
import { BoxComponent } from "./components/box/box.component";
import { ThemeProviderComponent } from "./theme/theme-provider/theme-provider.component";
import { FrontalModule } from "frontal";
import { RoleProviderComponent } from "./role/role-provider/role-provider.component";
import { ChevronDownIconComponent } from "./svg/chevron-down-icon/chevron-down-icon.component";
import { ChevronUpIconComponent } from "./svg/chevron-up-icon/chevron-up-icon.component";
import {
  BreadcrumbsComponent,
  BreadcrumbListDirective,
  BreadcrumbItemDirective
} from "./components/breadcrumbs/breadcrumbs.component";
import { OlComponent } from "./components/semantic/ol/ol.component";
import { NavComponent } from "./components/semantic/nav/nav.component";
import { LiComponent } from "./components/semantic/li/li.component";
import { AComponent } from "./components/semantic/a/a.component";
import { DivComponent } from "./components/semantic/div/div.component";
import { SvgComponent } from "./components/semantic/svg/svg.component";
import { SettingIconComponent } from "./svg/setting-icon/setting-icon.component";
import { AtomicComponentComponent } from './atomic-component.component';

jss.setup(preset());

const exportItems = [
  AtomicComponentComponent,
  BoxComponent,
  ThemeProviderComponent,
  RoleProviderComponent,
  ChevronDownIconComponent,
  ChevronUpIconComponent,
  BreadcrumbsComponent,
  BreadcrumbItemDirective,
  BreadcrumbListDirective,
  OlComponent,
  NavComponent,
  LiComponent,
  AComponent,
  DivComponent,
  SvgComponent,
  SettingIconComponent
]
@NgModule({
  declarations: exportItems,
  imports: [CommonModule, FrontalModule],
  exports: exportItems
})
export class AtomicComponentModule {}
