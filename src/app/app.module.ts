import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {JsonRendererComponent} from './renderer/json-renderer.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    JsonRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
