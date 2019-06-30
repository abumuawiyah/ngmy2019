import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import jss from 'jss';
import preset from 'jss-preset-default';

import { AtomicComponentModule } from "projects/atomic-component/src/public-api";

jss.setup(preset());

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AtomicComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
