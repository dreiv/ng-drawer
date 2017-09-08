import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DocumentService } from './services/document.service';
import { DrawerComponent } from './modules/drawer/components/drawer/drawer.component';
import { DrawerContainerComponent } from './modules/drawer/components/drawer-container/drawer-container.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    DrawerContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
